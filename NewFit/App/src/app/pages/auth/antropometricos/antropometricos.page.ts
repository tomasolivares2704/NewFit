import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.models';
import { Antropometricos } from 'src/app/models/antropometricos.models';

@Component({
  selector: 'app-antropometricos',
  templateUrl: './antropometricos.page.html',
  styleUrls: ['./antropometricos.page.scss'],
})
export class AntropometricosPage implements OnInit {

  user = {} as User;
  antropometrico = {} as Antropometricos;

  edades: number[] = [];
  alturas: number[] = [];
  sexo: string[] = ['Masculino','Femenino']

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
    ) { }

  form = new FormGroup({
    'edad': new FormControl ('', [Validators.required]),
    'altura': new FormControl ('', [Validators.required]),
    'peso': new FormControl ('', [Validators.required]),
    'sexo': new FormArray([], [Validators.required]),
  });

  ngOnInit() {

    this.user = this.utilsSvc.getElementInLocalStorage('user');
    // Medidas para los campos de selección
    //Edad
    for(let i = 10; i <=99; i++){
      this.edades.push(i);
    }
    //Altura
    for(let i = 90; i <= 220; i++){
      this.alturas.push(i);
    }
  }

  async sendAntropometricData() {
    if (this.form.valid) {
      const formData = this.form.value; 
  
      // Crea un objeto Antropometrico con los datos del formulario
      const antropometricoData: Omit<Antropometricos, 'id'> = {
        edad: +formData.edad,
        estatura: formData.altura,
        peso: formData.peso,
        sexo: formData.sexo
      };
  
      try {

        if (this.user && this.user.uid) {
          // Define la ruta a la subcolección "Antropometrico" del usuario
          const antropometricoCollectionPath = `user/${this.user.uid}/antropometrico`;
  
          await this.firebaseSvc.addToSubcollection(antropometricoCollectionPath,'antropometrico', antropometricoData );
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

  //Función que setea la información en el LocalStorage
  save(){
    var f = this.form.value;
  
    var userAnt = {
      edad: f.edad,
      altura: f.altura,
      peso: f.peso,
      sexo: f.sexo,
    }

    localStorage.setItem('userAnt', JSON.stringify(userAnt));
  }

}
