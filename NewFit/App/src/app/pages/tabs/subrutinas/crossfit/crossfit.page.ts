import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Firebase
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
//Interfaces
import { User } from 'src/app/models/user.models';
import { Foods } from 'src/app/models/food.models';
import { exercices } from 'src/app/models/exercices.models';

@Component({
  selector: 'app-crossfit',
  templateUrl: './crossfit.page.html',
  styleUrls: ['./crossfit.page.scss'],
})
export class CrossfitPage implements OnInit {


  foodForm: FormGroup;
  foods: Foods[] = [];

  exerciceForm: FormGroup;
  exercices: exercices[] = [];

  user = {} as User;
  isModalOpen = false;
  inputEnabled: boolean;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setModalState(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  loadExerciceData(exercice: any) {

      this.exerciceForm.patchValue({
        name: exercice.name,
        class_exercice: exercice.class_exercice,
        expertis_exercice: exercice.expertis_exercice,
        img_exercice: exercice.img_exercice,
        description_exercice: exercice.description_exercice,
        beginer_exercice: exercice.beginer_exercice,
        inter_exercice: exercice.inter_exercice,
        expert_exercice: exercice.expert_exercice,
      });
      console.log("ID del ejercicio seleccionado:", exercice.id);
    }
  
  

  setFoodId(foodId) {
    // Suponiendo que tengas una propiedad llamada selectedFoodId en tu clase
    this.selectedFoodId = foodId;
  }

  selectedFoodId: string;

  setExerciceId(exerciceId) {
    this.selectedExerciceId = exerciceId;
  }

  selectedExerciceId: string;


  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.getUser();
    this.initForm();
    this.getExercices();
  }
  //Optener Valores
  initForm() {
    this.exerciceForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'class_exercice': ['', [Validators.required]],
      'expertis_exercice': ['', [Validators.required]],
      'img_exercice': ['', [Validators.required]],
      'description_exercice': ['', [Validators.required]],
      'beginer_exercice': ['', [Validators.required]],
      'inter_exercice': ['', [Validators.required]],
      'expert_exercice': ['', [Validators.required]],
    })
  }

  //Funcion para Obtener al Usuario
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
    console.log("ID del ejercicio en la función updateExercice:", this.selectedExerciceId);

    // Crea Objeto
    const updatedExerciceData = {
      name: this.exerciceForm.value.name.toString(),
      class_exercice: this.exerciceForm.value.class_exercice.toString(),
      expertis_exercice: this.exerciceForm.value.expertis_exercice.toString(),
      img_exercice: this.exerciceForm.value.img_exercice.toString(),
      description_exercice: this.exerciceForm.value.description_exercice.toString(),
      beginer_exercice: this.exerciceForm.value.beginer_exercice.toString(),
      inter_exercice: this.exerciceForm.value.inter_exercice.toString(),
      expert_exercice: this.exerciceForm.value.expert_exercice.toString(),
    };

    // Construye la Ruta
    const path = `user/${this.user.uid}/exercices/${this.selectedExerciceId}`;
    console.log(path);

    // Metodo UpDate en la Ruta
    this.firebaseSrv.updateDocument(path, updatedExerciceData)
      .then(() => {
        console.log('Ejercicio actualizado correctamente.');
        this.exerciceForm.reset(); // Limpiar el formulario después de actualizar el ejercicio
        this.inputEnabled = false; // Desactiva la edición

        window.location.reload();
      })
      .catch(error => {
        console.error('Error al actualizar el ejercicio:', error);
        // Manejo de errores si es necesario
      });
  }






}

