import { Component, OnInit } from '@angular/core';

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


  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Funcion para Cargar los datos al formulario FoodForm
  loadFoodData(food: any) {
    //Metodo para Actualizar Valores del Formulario
    this.foodForm.patchValue({
      name: food.name,
      calories: food.calories,
      carbs: food.carbs,
      fats: food.fats,
      protein: food.protein,
      img: food.img,
    });
    console.log("ID del alimento seleccionado:", food.id);
  }
  

  //setFoodId(foodId) {
    //this.selectedFoodId = foodId;
  //}

  selectedFoodId: string;

  constructor(private firebaseSrv: FirebaseService,private utilsSvc: UtilsService,private formBuilder: FormBuilder) { }

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
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
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
    updateFood(id: string) {
      console.log("ID del alimento en la función updateFood:", id);
      console.log("selectedFoodId:", this.selectedFoodId);
      
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
    const path = `user/${this.user.uid}/foods/${id}`;
  
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
