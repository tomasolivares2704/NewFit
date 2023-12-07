import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Directory, FileInfo, Filesystem, ReaddirResult } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.models';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  path: string = "TestImages";
  photos: string[] = [];
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }


  // Loading

  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    cssClass: 'ion-loading custom-loading';
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  // LocalStorage
  setElementInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getElementInLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeElementInLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  // Router
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Alert
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }

  // Modal Present
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    
    if(data){
      return data;
    }
  }


  // Dismiss
  dismssModal(data?: any) {
    this.modalController.dismiss(data);
  }

  getPercentage(task: Task){
    let completeItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100/totalItems) * completeItems;

    return parseInt(percentage.toString());
  }

  //Cámara y almacenamiento local

  getPhotos() {
    Filesystem.readdir(
      {
        path: this.path,
        directory: Directory.Documents
      }
    ).then( files =>{
      this.loadPhotos(files.files);

    }).catch(err => {
      console.log(err);
      Filesystem.mkdir(
        {
          path: this.path,
          directory: Directory.Documents
        }
      )
    })
  }

  loadPhotos(photos: FileInfo[]) {
    photos.forEach(file => {

      Filesystem.readFile({
        path: `${this.path}]/${file.name}`,
        directory: Directory.Documents
      }).then(photo => {
        this.photos.push('data:image/jpeg;base64' + photo.data);
      })
    });
  }

  base64ToString(base64: string): string {
    const decodedString = atob(base64); // Decodificar la cadena Base64
    return decodedString;
  }

}
