/**
 * Este es un componente Angular llamado 'CrudListPage' que se utiliza para mostrar una lista de alimentos y permitir la 
 * actualización de los datos de un alimento seleccionado.
 *
 * Ejemplo de uso:
 * 
 * // Crear una instancia del componente CrudListPage
 * const crudListPage = new CrudListPage();
 * 
 * // Cargar los datos de un alimento en el formulario
 * crudListPage.loadFoodData('foodId');
 * 
 * // Actualizar los datos de un alimento
 * crudListPage.updateFood();
 *
 * Inputs:
 * - id (string): El ID del alimento que se desea cargar en el formulario.
 *
 * Flujo:
 * 1. El método 'loadFoodData' recibe un ID como entrada y busca el alimento correspondiente en la lista de alimentos.
 * 2. Si se encuentra el alimento, se actualiza el formulario con los datos del alimento.
 * 3. El ID del alimento se almacena en la variable 'foodId'.
 * 4. El método 'updateFood' se utiliza para actualizar los datos del alimento seleccionado.
 * 5. Se crea un objeto 'updatedFoodData' con los valores del formulario.
 * 6. Se construye una ruta utilizando el ID del usuario y el ID del alimento.
 * 7. Se llama al método 'updateDocument' del servicio 'FirebaseService' para actualizar los datos del alimento en la base de datos.
 * 8. Si la actualización es exitosa, se muestra un mensaje de éxito y se reinicia el formulario.
 *
 * Salidas:
 * - Ninguna. El código realiza acciones internas en el componente y en la base de datos, pero no devuelve ningún valor.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Firebase
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
//Interfaces
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.page.html',
  styleUrls: ['./crud-list.page.scss'],
})
export class CrudListPage implements OnInit {

  foodForm: FormGroup;
  foods: Foods[] = [];
  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;
  foodId: string;

  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Funcion para Cargar los datos al formulario FoodForm
  loadFoodData(id: string) {
    // Busca el alimento correspondiente por su ID
    const food = this.foods.find(f => f.id === id);
    if (food) {
      // Actualiza el formulario con los datos del alimento
      this.foodForm.patchValue({
        name: food.name,
        calories: food.calories,
        carbs: food.carbs,
        fats: food.fats,
        protein: food.protein,
        img: food.img,
      });
      this.foodId = id; // Almacena el ID del alimento
      console.log("ID del alimento seleccionado:", id);
    }
  }

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder, 
    ) { }

  ngOnInit() {
    this.getUser();
    this.getFoods();
    this.initForm();
  }

  //Metodo Inicializar el Formulario Reactivo Angular
  initForm() {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  //Funcion para Obtener al Usuario
  getUser() {
    this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  //Funcion para Obtener la Lista de Foods(Alimentos)
  getFoods(){
    // Obtener Objeto User
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    // Crea Ruta
    let path = `user/${user.uid}`;
    //Obtiene la SubCollecion
    let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
        this.foods = res
        sub.unsubscribe()
        
      }
    })
  }
  
    // Metodo para Actualizar Aliemento (Food) //
    updateFood() {
      console.log("ID del alimento en la función updateFood:", this.foodId);
    
      // Crea Objeto
      const updatedFoodData = {
        calories: this.foodForm.value.calories.toString(),
        carbs: this.foodForm.value.carbs.toString(),
        fats: this.foodForm.value.fats.toString(),
        name: this.foodForm.value.name.toString(),
        protein: this.foodForm.value.protein.toString(),
        img: this.foodForm.value.img.toString(),
      };
    
      // Construye la Ruta
      const path = `user/${this.user.uid}/foods/${this.foodId}`;
      console.log(path);
  
    // Metodo UpDate en la Ruta
    this.firebaseSrv.updateDocument(path, updatedFoodData)
      .then(() => {
        console.log('Alimento actualizado correctamente.');
        this.foodForm.reset(); // Limpiar el formulario después de actualizar el alimento
        this.inputEnabled = false; // Desactiva la edición
      })
      .catch(error => {
        console.error('Error al actualizar el alimento:', error);
        // Manejo de errores si es necesario
      });
  }

}
