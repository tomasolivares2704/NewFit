import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { WatersLog } from 'src/app/models/waters.models';
import { User } from 'firebase/auth';

//Firebase
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  glasses: number = 0;
  waterLogs: WatersLog[] = [];
  user = {} as User;
  

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private toastController: ToastController,
    ) {}

  ngOnInit() {
  }

  //Funcion para Obtener al Usuario
  getUser() {
    this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  
  async registerWater() {
    const waterLog: WatersLog = {
      date: new Date(),
      glasses: this.glasses
    };
  
    const path = `user/${this.user.uid}`;
  
    try {
      await this.firebaseSrv.addToSubcollection(path, 'aguas', waterLog);
      console.log('Registro de agua añadido correctamente.');
      this.presentToast('Registro de agua añadido correctamente.');
      this.glasses = 0; // Reiniciar la cantidad de vasos
    } catch (error) {
      console.error('Error al añadir el registro de agua:', error);
      this.presentToast('Error al añadir el registro de agua.');
    }
  }
  


  getWaterLogs() {
    let user: User = this.utilsSvc.getElementInLocalStorage('user')
    let path = `user/${user.uid}`;
    this.firebaseSrv.getSubcollection(path, 'aguas').subscribe({
      next: (res: any[]) => { // Cambia el tipo a 'any[]'
        console.log(res);
        this.waterLogs = res as WatersLog[]; // Asegúrate de que 'res' se asigna correctamente a 'this.waterLogs'
      }
    });
  }
  
  

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}



