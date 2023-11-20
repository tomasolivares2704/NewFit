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
  food: Foods; // Asegúrate de tener la propiedad 'food' definida

  constructor(private route: ActivatedRoute, private firebaseSrv: FirebaseService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const foodId = params.get('id');
      this.loadFoodDetails(foodId);
    });
  }

  loadFoodDetails(foodId: string) {
    // Utiliza tu servicio de Firebase para obtener los detalles del alimento según el ID
    // this.firebaseSrv.getFoodDetails(foodId).subscribe(food => this.food = food);
  }
  
}
