import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/interfaces/fooditem';
import { CrudService } from 'src/app/services/api/crud.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-proteina',
  templateUrl: './proteina.page.html',
  styleUrls: ['./proteina.page.scss'],
})
export class ProteinaPage implements OnInit {

  newFood: FoodItem = {
    id_food: 0,
    name_food: '',
    description_food: '',
    img_food: '',
    protein_food: 0,
    carbs_food: 0,
    fat_food: 0,
    type_food: 0,
    calories_food: 0,
  };

  foods: FoodItem[] = [];


  constructor(private CrudService: CrudService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this.CrudService.getAllFoods()
      .subscribe(foods => {
        this.foods = foods;
      });
  }


}
