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

  exerciceForm: FormGroup;

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
      'class_exercice': new FormControl ('', [Validators.required]),
      'expertis_exercice': new FormControl ('', [Validators.required]),
      'img_exercice': new FormControl ('', [Validators.required]),
      'description_exercice': new FormControl ('', [Validators.required]),
      'beginer_exercice': new FormControl ('', [Validators.required]),
      'inter_exercice': new FormControl ('', [Validators.required]),
      'expert_exercice': new FormControl ('', [Validators.required]),
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
      this.exerciceForm.reset(); // Limpiar el formulario después de agregar el alimento
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
     let class_exercice = this.exercices.class_exercice;
     let expertis_exercice = this.exercices.expert_exercice;
     let img_exercice = this.exercices.img_exercice;
     let description_exercice = this.exercices.description_exercice; 
     let beginer_exercice = this.exercices.beginer_exercice;
     let inter_exercice = this.exercices.inter_exercice;
     let expert_exercice = this.exercices.expert_exercice;
 
     this.firebaseSrv.updateDocument(path, {name, 
                                            class_exercice, 
                                            expertis_exercice, 
                                            img_exercice, 
                                            description_exercice, 
                                            beginer_exercice, 
                                            inter_exercice,
                                            expert_exercice})
       .then(() => {
         this.inputEnabled = false; // Desactiva la edición
       })
       .catch((error) => {
         console.error('Error al actualizar datos antropometricos en Firebase:', error);// Error al actualizar
       });
   };
  }

}
