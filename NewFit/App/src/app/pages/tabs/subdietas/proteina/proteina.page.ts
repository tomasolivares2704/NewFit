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

  //Funcion para Obtener Foods
  //getFoods(){
    //let user: User = this.utilsSvc.getElementInLocalStorage('user')
    //let path = `user/${user.uid}`;
    //let sub = this.firebaseSrv.getSubcollection(path, 'foods').subscribe({
      //next: (res: Foods[]) => {
        //console.log(res);
        //this.foods = res
        //sub.unsubscribe()
        
      //}
    //})
  //}

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
  

  
  
  
    updateFood(id: string) {
      console.log("ID del alimento en la función updateFood:", id);
      console.log("selectedFoodId:", this.selectedFoodId);
  
      const updatedFoodData = {
        calories: this.foodForm.value.calories,
        carbs: this.foodForm.value.carbs,
        fats: this.foodForm.value.fats,
        name: this.foodForm.value.name,
        protein: this.foodForm.value.protein,
        img: this.foodForm.value.img.toString(),

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
