import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private afStorage: AngularFireStorage,
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

  initForm() {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required],
      imageFile: ['', Validators.required],
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
    };

    const path = `user/${this.user.uid}`;

    try {
      const imageFile = this.foodForm.value.imageFile;

      if (imageFile) {
        await this.uploadImage(imageFile, path, newFoodData);

        console.log('Nuevo alimento añadido correctamente.');
        this.foodForm.reset();

        const alert = await this.alertController.create({
          header: 'Nuevo alimento',
          message: 'Se ha agregado el nuevo alimento correctamente.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/tabs/subdietas/crud-list']);
              }
            }
          ],
        });

        await alert.present();
      } else {
        console.error('No se ha seleccionado ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al añadir el nuevo alimento:', error);
    }
  }

  async uploadImage(file: File, path: string, foodData: any): Promise<void> {
    try {
      const filePath = `images/${new Date().getTime()}_${file.name}`;
      const ref = this.afStorage.ref(filePath);
      await ref.put(file);

      await this.firebaseSrv.addToSubcollection(path, 'foods', foodData);
    } catch (error) {
      console.error('Error al subir la imagen o agregar los datos:', error);
      throw error;
    }
  }
  
  incrementarAlimentosCreados() {
    this.alimentosCreados++;
  }

  updateFood(foodId: string) {
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
        this.foodForm.reset();
        this.inputEnabled = false;
      })
      .catch(error => {
        console.error('Error al actualizar el alimento:', error);
      });
  }
}
