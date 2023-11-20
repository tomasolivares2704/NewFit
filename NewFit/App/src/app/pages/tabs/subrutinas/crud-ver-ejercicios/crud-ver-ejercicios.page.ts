import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { exercices } from 'src/app/models/exercices.models';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  exerciceForm: FormGroup;

  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Funcion para Cargar los datos al formulario ExerciceForm
  loadExerciceData(id: string) {
    // Busca el ejercicio correspondiente por su ID
    let exercice = this.exercices.find(f => f.id === id);
    if (exercice) {
      // Actualiza el formulario con los datos del ejercicio
      this.exerciceForm.patchValue({
        name: exercice.name,
        class_exercise: exercice.class_exercise,
        expertis_exercise: exercice.expertis_exercise,
        img_exercise: exercice.img_exercise,
        description_exercise: exercice.description_exercise,
        beginer_exercise: exercice.beginer_exercise,
        inter_exercise: exercice.inter_exercise,
        expert_exercise: exercice.expert_exercise,
      });
      this.exerciceId = id; // Almacena el ID del ejercicio
      console.log("ID del ejercicio seleccionado:", id);
    }
  }

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getExercices();
    this.initForm();
  }

  initForm() {
    this.exerciceForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'class_exercise': ['', [Validators.required]],
      'expertis_exercise': ['', [Validators.required]],
      'img_exercise': ['', [Validators.required]],
      'description_exercise': ['', [Validators.required]],
      'beginer_exercise': ['', [Validators.required]],
      'inter_exercise': ['', [Validators.required]],
      'expert_exercise': ['', [Validators.required]],
    })
  }

  // Funcion para Obtener al Usuario
  getUser() {
    return this.user = this.utilsSvc.getElementInLocalStorage('user');
  }

  // Funcion para Obtener la Lista de Exercices (Ejercicios)
  getExercices() {

    // Crea Ruta
    let path = `user/${this.user.uid}`;
    // Obtiene la SubCollecion
    let sub = this.firebaseSrv.getSubcollection(path, 'exercices').subscribe({
      next: (res: exercices[]) => {
        console.log(res);
        this.exercices = res
        sub.unsubscribe()

      }
    })
  }

  // Metodo para Actualizar Ejercicio (Exercice)
  updateExercice() {
    console.log("ID del ejercicio en la función updateExercice:", this.exerciceId);

    // Crea Objeto
    const updatedExerciceData = {
      name: this.exerciceForm.value.name.toString(),
      class_exercise: this.exerciceForm.value.class_exercise.toString(),
      expertis_exercise: this.exerciceForm.value.expertis_exercise.toString(),
      img_exercise: this.exerciceForm.value.img_exercise.toString(),
      description_exercise: this.exerciceForm.value.description_exercise.toString(),
      beginer_exercise: this.exerciceForm.value.beginer_exercise.toString(),
      inter_exercise: this.exerciceForm.value.inter_exercise.toString(),
      expert_exercise: this.exerciceForm.value.expert_exercise.toString(),
    };

    // Construye la Ruta
    const path = `user/${this.user.uid}/exercices/${this.exerciceId}`;
    console.log(path);

    // Metodo UpDate en la Ruta
    this.firebaseSrv.updateDocument(path, updatedExerciceData)
      .then(() => {
        console.log('Ejercicio actualizado correctamente.');
        this.exerciceForm.reset(); // Limpiar el formulario después de actualizar el ejercicio
        this.inputEnabled = false; // Desactiva la edición
      })
      .catch(error => {
        console.error('Error al actualizar el ejercicio:', error);
        // Manejo de errores si es necesario
      });
  }
}