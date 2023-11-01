import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { Antropometrico } from 'src/app/models/antropometricos.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  antropometrico = {} as Antropometrico;
  user = {} as User;
  loading = false;

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserInfo();
    this.getUser();
    this.registroLogin();
  }

  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
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

  registroLogin() {
    if (this.user.uid) {
      // Comprueba si ya se ha registrado el inicio de sesión en el almacenamiento local
      if (!localStorage.getItem('inicioSesionRegistrado')) {
        let timestamp = new Date();

      // Formatea la fecha en el formato que desees (por ejemplo, 'dd/mm/yyyy')
      let fechaFormateada = timestamp.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      let loginData = {
        userId: this.user.uid,
        date: fechaFormateada // Aquí se almacena la fecha formateada
      };
  
        const path = `logs/${"registros"}`;
  
        this.firebaseSrv.addToSubcollection(path, 'registros', loginData)
          .then(() => {
            console.log('Registro de inicio de sesión exitoso.');
            // Marca el inicio de sesión como registrado en el almacenamiento local
            localStorage.setItem('inicioSesionRegistrado', 'true');
          })
          .catch(error => {
            console.error('Error al registrar el inicio de sesión:', error);
          });
      } else {
        console.log('El inicio de sesión ya ha sido registrado anteriormente.');
      }
    } else {
      console.log('Usuario no válido o falta el UID.');
    }
  }
  

}
