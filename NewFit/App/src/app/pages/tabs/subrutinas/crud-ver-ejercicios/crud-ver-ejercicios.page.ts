import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { exercices } from 'src/app/models/exercices.models';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  // Funcion para Cargar los datos al formulario form
  loadExerciceData(id: string) {
    // Busca el ejercicio correspondiente por su ID
    let exercice = this.exercices.find(f => f.id === id);
    if (exercice) {
      // Actualiza el formulario con los datos del ejercicio
      this.form.patchValue({
        name: exercice.name,
        class_exercice: exercice.class_exercice,
        expertis_exercice: exercice.expertis_exercice,
        img_exercice: exercice.img_exercice,
        description_exercice: exercice.description_exercice,
        beginer_exercice: exercice.beginer_exercice,
        inter_exercice: exercice.inter_exercice,
        expert_exercice: exercice.expert_exercice,
      });
      this.exerciceId = id; // Almacena el ID del ejercicio
      console.log("ID del ejercicio seleccionado:", id);
    }
  }

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSvc: UtilsService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getExercices();
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del Ejercicio')).dataUrl;
    this.form.controls['img_exercice'].setValue(dataUrl);
  }

  form = new FormGroup({
    'name': new FormControl ('', [Validators.required]),
    'class_exercice': new FormControl ('', [Validators.required]),
    'expertis_exercice': new FormControl ('', [Validators.required]),
    'img_exercice': new FormControl ('', [Validators.required]),
    'description_exercice': new FormControl ('', [Validators.required]),
    'beginer_exercice': new FormControl ('', [Validators.required]),
    'inter_exercice': new FormControl ('', [Validators.required]),
    'expert_exercice': new FormControl ('', [Validators.required]),
  });


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
      name: this.form.value.name.toString(),
      class_exercice: this.form.value.class_exercice.toString(),
      expertis_exercice: this.form.value.expertis_exercice.toString(),
      img_exercice: this.form.value.img_exercice.toString(),
      description_exercice: this.form.value.description_exercice.toString(),
      beginer_exercice: this.form.value.beginer_exercice.toString(),
      inter_exercice: this.form.value.inter_exercice.toString(),
      expert_exercice: this.form.value.expert_exercice.toString(),
    };

    // Construye la Ruta
    const path = `user/${this.user.uid}/exercices/${this.exerciceId}`;
    console.log(path);

    // Metodo UpDate en la Ruta
    this.firebaseSrv.updateDocument(path, updatedExerciceData)
      .then(() => {
        console.log('Ejercicio actualizado correctamente.');
        this.form.reset(); // Limpiar el formulario después de actualizar el ejercicio
        this.inputEnabled = false; // Desactiva la edición

        window.location.reload();
      })
      .catch(error => {
        console.error('Error al actualizar el ejercicio:', error);
        // Manejo de errores si es necesario
      });
  }

    // Método para eliminar un alimento por su ID
    async deleteExercice(exerciceId: string) {
      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas eliminar este ejercicio?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Eliminar',
            handler: () => {
              // Construye la ruta
              const path = `user/${this.user.uid}/exercices/${exerciceId}`;
  
              // Llama al método de eliminación del servicio Firebase
              this.firebaseSrv.deleteDocument(path)
                .then(() => {
                  console.log('Ejercicio eliminado correctamente.');
                  // Actualiza la lista de alimentos después de la eliminación si es necesario
                  this.getExercices();

                  window.location.reload();
                })
                .catch(error => {
                  console.error('Error al eliminar el ejercicio:', error);
                  // Maneja los errores si es necesario
                });
            }
          }
        ]
      });
  
      await alert.present();
    }
  
}