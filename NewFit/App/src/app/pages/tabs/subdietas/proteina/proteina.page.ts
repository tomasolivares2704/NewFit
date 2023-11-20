import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Firebase
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
//Interfaces
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-proteina',
  templateUrl: './proteina.page.html',
  styleUrls: ['./proteina.page.scss'],
})
export class ProteinaPage implements OnInit {

  foodForm: FormGroup;
  foods: Foods[] = [];
  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;
  foodsWithProteinThreshold: Foods[] = [];


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  loadFoodData(food: any) {
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
  

  setFoodId(foodId) {
    // Suponiendo que tengas una propiedad llamada selectedFoodId en tu clase
    this.selectedFoodId = foodId;
  }

  selectedFoodId: string;


  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
    this.getFoods();
    this.initForm();
  }
  //Optener Valores
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

 // Agrega este nuevo método al componente
  getFoodsWithProteinThreshold(threshold: number): Foods[] {
    return this.foods.filter(food => food.protein >= threshold);

  }

// Modifica tu función getFoods para obtener los datos y luego llamar al nuevo método
// Modifica tu función getFoods para obtener los datos y luego llamar al nuevo método
getFoods() {
  let user: User = this.utilsSvc.getElementInLocalStorage('user');
  let path = `user/${user.uid}`;
  let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
    next: (res: Foods[]) => {
      console.log(res);
      
      // Convertir la propiedad protein a número si es necesario
      this.foods = res.map(food => ({
        ...food,
        protein: typeof food.protein === 'string' ? parseFloat(food.protein) : food.protein
      }));

      sub.unsubscribe();

      // Puedes hacer lo que quieras con los alimentos filtrados, por ejemplo, asignarlos a otra variable
      // this.filteredFoods = foodsWithProteinThreshold;
    }
  });
}
  

    updateFood(id: string) {
      console.log("ID del alimento en la función updateFood:", id);
      console.log("selectedFoodId:", this.selectedFoodId);
  
      const updatedFoodData = {
        calories: this.foodForm.value.calories,
        carbs: this.foodForm.value.carbs.toString(),
        fats: this.foodForm.value.fats.toString(),
        name: this.foodForm.value.name,
        protein: this.foodForm.value.protein.toString(),
        img: this.foodForm.value.protein.toString(),

      };
  
    const path = `user/${this.user.uid}/foods/${id}`;
  
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

  redirectToFoodDetails(foodId: string) {
    // Navegar a la página de detalles de alimentos y pasar el ID como parámetro
    this.router.navigate(['/tabs/id-food', foodId]);
  }






}
