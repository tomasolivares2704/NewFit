import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { FoodItem } from 'src/app/interfaces/fooditem';

@Component({
  selector: 'app-crud-crear',
  templateUrl: './crud-crear.page.html',
  styleUrls: ['./crud-crear.page.scss'],
})
export class CrudCrearPage implements OnInit {

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
  }

  createNewFood() {
    this.CrudService.createFood(this.newFood)
      .subscribe(createdFood => {
        console.log('Nuevo alimento creado:', createdFood);
        this.newFood = {
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
      });
  }
  

}
