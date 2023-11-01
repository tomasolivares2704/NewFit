import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'firebase/auth';
import { Antropometrico } from 'src/app/models/antropometricos.models';

@Component({
  selector: 'app-antropometrico',
  templateUrl: './antropometrico.page.html',
  styleUrls: ['./antropometrico.page.scss'],
})
export class AntropometricoPage implements OnInit {


  user = {} as User;
  antropometrico = {} as Antropometrico;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
    ) { }

  form = new FormGroup({
    'edad': new FormControl ('', [Validators.required]),
    'estatura': new FormControl ('', [Validators.required]),
    'peso': new FormControl ('', [Validators.required]),
    'sexo': new FormControl('', [Validators.required]),
    'objetivo': new FormControl ('', [Validators.required]),
    'nivelActividad': new FormControl ('', [Validators.required]),
    });


  ngOnInit() {
    this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  async saveData() {
    if (this.form.valid) {
  
      try {

        if (this.user && this.user.uid) {
          // Define la ruta a la subcolección "Antropometrico" del usuario
          let antropometricoCollectionPath = `user/${this.user.uid}`;

         this.firebaseSvc.addToSubcollection(antropometricoCollectionPath, 'antropometrico', this.form.value).then(
            (res) => {
              console.log(res);
            }
         );
        } else {
          console.error('Usuario no autenticado o falta información del usuario');
        }
  
        // Redirige a la siguiente página
        this.utilsSvc.routerLink('/tabs/home');
      } catch (error) {
        console.error('Error al agregar datos a la subcolección Antropometrico:', error);
      }
  
      // Restablece el formulario
      this.form.reset();
    }
  }
  
}


