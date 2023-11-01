import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { exercices } from 'src/app/models/exercices.models';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-ver-ejercicios',
  templateUrl: './crud-ver-ejercicios.page.html',
  styleUrls: ['./crud-ver-ejercicios.page.scss'],
})
export class CrudVerEjerciciosPage implements OnInit {

  exercices: exercices[] = [];
  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService
    ) { }

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

  ngOnInit() {
    this.getUser();
    this.getExcercices();
  }

    //Funcion para Obtener al Usuario
    getUser() {
      return this.user = this.utilsSvc.getElementInLocalStorage('user');
    }

    setModalState(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

    //Funcion para Obtener la Lista de Excercices(Ejercicios)
    getExcercices(){

      // Crea Ruta
      let path = `user/${this.user.uid}`;
      //Obtiene la SubCollecion
      let sub = this.firebaseSrv.getSubcollection(path, 'excercices').subscribe({
        next: (res: exercices[]) => {
          console.log(res);
          this.exercices = res
          sub.unsubscribe()
          
        }
      })
    }

}
