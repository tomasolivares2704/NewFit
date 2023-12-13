import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  foodsWithThresholds: Foods[] = []; 

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


  constructor(private firebaseSrv: FirebaseService,private utilsSvc: UtilsService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser();
    this.getFoods();
  }

  //Funcion para Obtener al Usuario
  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  getFoods() {
    let user: User = this.utilsSvc.getElementInLocalStorage('user');
    let path = `user/${user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
  
        // No necesitas convertir la propiedad protein a cadena (string)
        this.foods = res;
        this.foodsWithThresholds = this.filterFoods(this.foods);
  
        sub.unsubscribe();
      }
    });
  }
  
  filterFoods(foods: Foods[]): Foods[] {
    return foods.filter(
      (food) =>
        !isNaN(food.protein) &&
        !isNaN(food.carbs) &&
        !isNaN(food.fats) &&
        !isNaN(food.calories) &&
        food.protein >= 25 &&
        food.calories <= 380   
         );
  }

}
