import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Foods } from 'src/app/models/food.models';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {

  user = {} as User;
  foods: Foods[] = [];
  loading: boolean = false;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getNutrition()
    this.getUser()
    
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  getNutrition(){
    let path = 'users/${user.uid}';
    this.loading = true;


    let sub = this.firebaseSvc.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log('Datos recibidos:', res); // Agrega este console.log
        this.foods = res;
        sub.unsubscribe();
        this.loading = false;
      }
    });

  }

 


}
