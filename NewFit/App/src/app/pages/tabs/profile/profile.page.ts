import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Antropometrico } from 'src/app/models/antropometricos.models';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;
  antropometrico = {} as Antropometrico;
  foods: Foods[] = [];

  inputEnabled: boolean = false;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
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
  }

  ionViewWillEnter() {
    this.getUser();
    this.getUserInfo();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  signOut() {
    this.utilsSvc.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Quieres cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Si, cerrar',
          handler: () => {
            this.firebaseSrv.signOut();
          }
        }
      ]
    });
  }

  getUserInfo() {
    let path = `user/${this.user.uid}`;
    let sub = this.firebaseSrv.getSubcollection(path, 'antropometrico').subscribe({

      next: (res: Antropometrico[]) => {
        this.antropometrico = res[0];
        console.log(res);
        sub.unsubscribe();
      }
    })
  }

  deleteUser() {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Cuenta',
      message: '¿Estás seguro de que quieres eliminar tu cuenta?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelarr',
          role: 'cancel'
        },{
        text: 'Si, eliminar',
        handler: () =>{

          this.firebaseSrv.deleteUser()
            .then(() => {
            })
            .catch(error => {
              console.error('Error al eliminar la cuenta de usuario:', error);
            });
          }
        }]
      });
  }

  modifyData() {
    if (this.inputEnabled) {
      //Actualiza datos antropometricos en la base de datos de Firebase
     let path = `user/${this.user.uid}/antropometrico/${this.antropometrico.id}`;
     let nivelActividad = this.antropometrico.nivelActividad;
     let estatura = this.antropometrico.estatura;
     let peso = this.antropometrico.peso;
     let objetivo = this.antropometrico.objetivo;
 
     this.firebaseSrv.updateDocument(path, {nivelActividad, estatura, peso, objetivo})
       .then(() => {
         this.inputEnabled = false; // Desactiva la edición
       })
       .catch((error) => {
         console.error('Error al actualizar datos antropometricos en Firebase:', error);// Error al actualizar
       });
   };
  }

  enableInput() {
    this.inputEnabled = !this.inputEnabled;
  }

}
