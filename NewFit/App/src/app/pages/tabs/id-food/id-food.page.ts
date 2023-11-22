// Importa otras dependencias que puedas necesitar
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-id-food',
  templateUrl: './id-food.page.html',
  styleUrls: ['./id-food.page.scss'],
})
export class IdFoodPage implements OnInit {
  food: Foods | null;

  constructor(private route: ActivatedRoute, private firebaseSrv: FirebaseService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const foodId = params.get('id');
      this.loadFoodDetails(foodId);
    });
  }

  async loadFoodDetails(foodId: string) {
    try {
      const food = await this.firebaseSrv.getFoodDetails(foodId).toPromise();
      if (food) {
        this.food = food;
      } else {
        console.error('No se encontró el alimento con el ID:', foodId);
      }
    } catch (error) {
      console.error('Error al obtener detalles del alimento:', error);
    }
  }
}
