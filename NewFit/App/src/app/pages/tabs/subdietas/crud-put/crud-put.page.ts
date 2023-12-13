import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-put',
  templateUrl: './crud-put.page.html',
  styleUrls: ['./crud-put.page.scss'],
})
export class CrudPutPage implements OnInit {

  foodForm: FormGroup;
  
  
  foods: Foods[] = [];
  user = {} as User;
  inputEnabled: boolean;

  openCam: boolean = false;
  selectedImage: string | undefined;

  alimentosCreados: number = 0;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getFoods();
    this.initForm();
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del Alimento')).dataUrl;
    this.foodForm.controls['img'].setValue(dataUrl);
  }

  initForm() {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

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
  async createNewFood() {
    const newFoodData = {
      calories: this.foodForm.value.calories.toString(),
      carbs: this.foodForm.value.carbs.toString(),
      fats: this.foodForm.value.fats.toString(),
      name: this.foodForm.value.name,
      protein: this.foodForm.value.protein.toString(),
      img: this.foodForm.value.img.toString(),
    };
  
    const path = `user/${this.user.uid}`;
  
    try {
      await this.firebaseSrv.addToSubcollection(path, 'foods', newFoodData);
      console.log('Nuevo alimento añadido correctamente.');
      this.incrementarAlimentosCreados(); //Incrementa el contador
      this.foodForm.reset(); // Limpiar el formulario después de agregar el alimento
      
  
      // Mostrar una alerta que indica que se ha agregado el nuevo alimento
      const alert = await this.alertController.create({
        header: 'Nuevo alimento',
        message: 'Se ha agregado el nuevo alimento correctamente.',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              // Redirigir a otra vista después de hacer clic en 'Aceptar'
              this.router.navigate(['/tabs/subdietas/crud-list']); // Reemplaza 'otra-ruta' con la ruta a la que deseas redirigir
            }
          }
        ],
      });
  
      await alert.present();
    } catch (error) {
      console.error('Error al añadir el nuevo alimento:', error);
      // Manejo de errores si es necesario
    }
  }
  // Método para incrementar el contador de alimentos creados
  incrementarAlimentosCreados() {
    this.alimentosCreados++;
  }

  updateFood(foodId: string) {
    // Obtén el ID del alimento seleccionado desde algún lugar
    // let foodId = /* Obtén el ID del alimento seleccionado desde algún lugar */;
    
    const updatedFoodData = {
      calories: this.foodForm.value.calories.toString(),
      carbs: this.foodForm.value.carbs.toString(),
      fats: this.foodForm.value.fats.toString(),
      name: this.foodForm.value.name,
      protein: this.foodForm.value.protein.toString(),
      img: this.foodForm.value.img.toString(),
    };
  
    const path = `user/${this.user.uid}/foods/${foodId}`;
  
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
