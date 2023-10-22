import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  user = {} as User;
  foods: Foods[] = [];
  foodForm: FormGroup;

  

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder
  ) { 
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      carbs: ['', Validators.required],
      fats: ['', Validators.required],
      protein: ['', Validators.required],
    });
  }

  

  ngOnInit() {
  }

  getTasks(){
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    let path = `users/${user.uid}`;

    let sub = this.firebaseSvc.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
        this.foods = res
        sub.unsubscribe()
      }
    })
  }

  onSubmit() {
    if (this.foodForm.valid) {
      const formData: Foods = this.foodForm.value;
      const user: User = this.utilsSvc.getElementInLocalStorage('user');
      const path = `users/${user.uid}/foods`;

      this.firebaseSvc.addToSubcollection(path, 'foods', formData).then(() => {
        console.log('Alimento creado exitosamente.');
        // Limpia el formulario después de guardar los datos
        this.foodForm.reset();
      }).catch(error => {
        console.error('Error al crear el alimento:', error);
      });
    } else {
      console.error('Formulario inválido. Por favor, verifica los campos.');
    }
  }



  getFoods() {
    const user: User = this.utilsSvc.getElementInLocalStorage('user');
    const path = `users/${user.uid}`;

    this.firebaseSvc.getSubcollection(path, 'foods').subscribe({
      next: (res: Foods[]) => {
        console.log(res);
        this.foods = res;
      }
    });
  }
  

}
