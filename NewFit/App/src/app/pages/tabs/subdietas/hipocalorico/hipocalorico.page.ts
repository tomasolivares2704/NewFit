// hipocalorico.page.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Firebase
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

// Interfaces
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-hipocalorico',
  templateUrl: './hipocalorico.page.html',
  styleUrls: ['./hipocalorico.page.scss'],
})
export class HipocaloricoPage implements OnInit {

  foodForm: FormGroup;
  foods: Foods[] = [];
  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;
  foodHipoList: Foods[] = [];

  constructor(private firebaseSrv: FirebaseService, private utilsSvc: UtilsService) { }

  ngOnInit() {
    this.getUser();
    this.getFoods();
  }

  // Obtener al Usuario
  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  // Obtener Foods
  getFoods() {
    let user: User = this.utilsSvc.getElementInLocalStorage('user');
    let path = `user/${user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log('Datos de Firebase:', res);

        // No necesitas convertir la propiedad protein a cadena (string)
        this.foods = res;
        this.foodHipoList = this.filterFoods2(this.foods);

        console.log('Alimentos después del filtrado:', this.foodHipoList);

        sub.unsubscribe();
      }
    });
  }

  // Filtrar Alimentos
  filterFoods2(foods: Foods[]): Foods[] {
    return foods.filter(
      (food) =>
        !isNaN(food.protein) &&
        !isNaN(food.carbs) &&
        !isNaN(food.fats) &&
        !isNaN(food.calories) &&
        food.protein >= 10 &&
        food.carbs >= 15 &&
        food.fats < 12 &&
        food.calories <= 280
    );
  }

  // Resto del código de la clase (si lo hay)...

}
