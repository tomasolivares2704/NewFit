import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { ItemFood } from 'src/app/interfaces/itemfood';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
      protein: food.protein
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
    this.initForm();
  }

  //Optener Valores
  initForm() {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required]
    });
  }

  //Funcion para Obtener al Usuario
  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  //Funcion para Obtener Foods
  getFoods(){
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    let path = `user/${user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
        this.foods = res
        sub.unsubscribe()
        
      }
    })
  }
  
  updateFood(id: string) {
    console.log("ID del alimento seleccionado:", id);
  
    const updatedFoodData = {
      calories: this.foodForm.value.calories.toString(),
      carbs: this.foodForm.value.carbs.toString(),
      fats: this.foodForm.value.fats.toString(),
      name: this.foodForm.value.name,
      protein: this.foodForm.value.protein.toString()
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

}
