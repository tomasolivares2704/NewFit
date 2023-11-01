import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { User } from 'src/app/models/user.models';
import { exercices } from 'src/app/models/exercices.models';


@Component({
  selector: 'app-crud-crear-ejercicio',
  templateUrl: './crud-crear-ejercicio.page.html',
  styleUrls: ['./crud-crear-ejercicio.page.scss'],
})
export class CrudCrearEjercicioPage implements OnInit {

  exerciseForm: FormGroup;

  user = {} as User;
  exercices = {} as exercices;
  inputEnabled: boolean;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  form = new FormGroup({
      'name': new FormControl ('', [Validators.required]),
      'class_exercise': new FormControl ('', [Validators.required]),
      'expertis_exercise': new FormControl ('', [Validators.required]),
      'img_exercise': new FormControl ('', [Validators.required]),
      'description_exercise': new FormControl ('', [Validators.required]),
      'beginer_exercise': new FormControl ('', [Validators.required]),
      'inter_exercise': new FormControl ('', [Validators.required]),
      'expert_exercise': new FormControl ('', [Validators.required]),
    });
  
  
  getExercices(){
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    let path = `user/${user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'exercices').subscribe({
      next: (res: exercices[]) => {
        console.log(res);
        this.exercices = res[0]
        sub.unsubscribe()
        
      }
    })
  }

  createNewExercice(){
    let path = `user/${this.user.uid}`;

    this.firebaseSrv.addToSubcollection(path, 'exercices', this.form.value)
    .then(() => {
      console.log('Nuevo ejercicio añadido correctamente.');
      this.exerciseForm.reset(); // Limpiar el formulario después de agregar el alimento
    })
    .catch(error => {
      console.error('Error al añadir el nuevo ejercicio', error);
      // Manejo de errores si es necesario
    });

  }

  modifyData() {
    if (this.inputEnabled) {
      //Actualiza datos antropometricos en la base de datos de Firebase
     let path = `user/${this.user.uid}/exercices/${this.exercices.id}`;

     let name = this.exercices.name;
     let class_exercise = this.exercices.class_exercise;
     let expertis_exercise = this.exercices.expert_exercise;
     let img_exercise = this.exercices.img_exercise;
     let description_exercise = this.exercices.description_exercise; 
     let beginer_exercise = this.exercices.beginer_exercise;
     let inter_exercise = this.exercices.inter_exercise;
     let expert_exercise = this.exercices.expert_exercise;
 
     this.firebaseSrv.updateDocument(path, {name, 
                                            class_exercise, 
                                            expertis_exercise, 
                                            img_exercise, 
                                            description_exercise, 
                                            beginer_exercise, 
                                            inter_exercise,
                                            expert_exercise})
       .then(() => {
         this.inputEnabled = false; // Desactiva la edición
       })
       .catch((error) => {
         console.error('Error al actualizar datos antropometricos en Firebase:', error);// Error al actualizar
       });
   };
  }

}
