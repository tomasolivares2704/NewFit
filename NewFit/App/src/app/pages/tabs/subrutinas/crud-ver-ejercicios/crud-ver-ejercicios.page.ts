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
  exerciceId: string;

  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

    //Funcion para Cargar los datos al formulario FoodForm
    loadExerciceData(id: string) {
      // Busca el alimento correspondiente por su ID
      let exercices = this.exercices.find(f => f.id === id);
      if (exercices) {
        // Actualiza el formulario con los datos del alimento
        this.form.patchValue({
          name: exercices.name,
          class_exercise: exercices.class_exercise,
          expertis_exercise: exercices.expertis_exercise,
          img_exercise: exercices.img_exercise,
          description_exercise: exercices.description_exercise,
          beginer_exercise: exercices.beginer_exercise,
          inter_exercise: exercices.inter_exercise,
          expert_exercise: exercices.expert_exercise,
        });
        this.exerciceId = id; // Almacena el ID del ejercicio
        console.log("ID del alimento seleccionado:", id);
      }
    }

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService
    ) { }

    ngOnInit() {
      this.getUser();
      this.getExcercices();
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

    //Funcion para Obtener al Usuario
    getUser() {
      return this.user = this.utilsSvc.getElementInLocalStorage('user');
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

      // Metodo para Actualizar Ejercicio (Exercice) //
      updateExercice() {
        console.log("ID del alimento en la función updateFood:", this.exerciceId);
      
        // Crea Objeto
        const updatedFoodData = {
          name: this.form.value.name.toString(),
          class_exercise: this.form.value.class_exercise.toString(),
          expertis_exercise: this.form.value.expertis_exercise.toString(),
          img_exercise: this.form.value.img_exercise.toString(),
          description_exercise: this.form.value.description_exercise.toString(),
          beginer_exercise: this.form.value.beginer_exercise.toString(),
          inter_exercise: this.form.value.inter_exercise.toString(),
          expert_exercise: this.form.value.expert_exercise.toString(),
        };
      
        // Construye la Ruta
        const path = `user/${this.user.uid}/exercices/${this.exerciceId}`;
        console.log(path);
    
      // Metodo UpDate en la Ruta
      this.firebaseSrv.updateDocument(path, updatedFoodData)
        .then(() => {
          console.log('Alimento actualizado correctamente.');
          this.form.reset(); // Limpiar el formulario después de actualizar el alimento
          this.inputEnabled = false; // Desactiva la edición
        })
        .catch(error => {
          console.error('Error al actualizar el alimento:', error);
          // Manejo de errores si es necesario
        });
    }
}
