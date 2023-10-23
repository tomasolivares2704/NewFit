import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { ItemFood } from 'src/app/interfaces/itemfood';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-crud-crear',
  templateUrl: './crud-crear.page.html',
  styleUrls: ['./crud-crear.page.scss'],
})
export class CrudCrearPage implements OnInit {


  foodForm: FormGroup;
  
  foods: Foods[] = [];
  user = {} as User;
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  initForm() {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required]
    });
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  getFoods(){
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    let path = `users/${user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
        this.foods = res
        sub.unsubscribe()
        
      }
    })
  }



  createNewFood() {
    const newFoodData = {
      calories: this.foodForm.value.calories.toString(),
      carbs: this.foodForm.value.carbs.toString(),
      fats: this.foodForm.value.fats.toString(),
      name: this.foodForm.value.name,
      protein: this.foodForm.value.protein.toString()
    };

    const path = `users/${this.user.uid}`;

    this.firebaseSrv.addToSubcollection(path, 'foods', newFoodData)
      .then(() => {
        console.log('Nuevo alimento añadido correctamente.');
        this.foodForm.reset(); // Limpiar el formulario después de agregar el alimento
      })
      .catch(error => {
        console.error('Error al añadir el nuevo alimento:', error);
        // Manejo de errores si es necesario
      });
  }


  


}
