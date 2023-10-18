import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { EjercicioItem } from 'src/app/interfaces/exerciseitem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-crear-ejercicio',
  templateUrl: './crud-crear-ejercicio.page.html',
  styleUrls: ['./crud-crear-ejercicio.page.scss'],
})
export class CrudCrearEjercicioPage implements OnInit {

  newEjercicio: EjercicioItem = {
    id_exercide: 0,
    class_exercise: 0,
    expertis_exercise: 0,
    img_exercise: '',
    description_exercise: '',
    beginer_exercise: '',
    inter_exercise: '',
    expert_exercise: '',
  };

  ejercicios: EjercicioItem[] = [];

  constructor(private CrudService: CrudService ) { }

  ngOnInit() {
  }

  createNewEjercicio() {
    this.CrudService.createdEjercicio(this.newEjercicio)
      .subscribe(createdEjercicio => {
        console.log('Nuevo ejercicio creado:', createdEjercicio);
        this.newEjercicio = {
          id_exercide: 0,
          class_exercise: 0,
          expertis_exercise: 0,
          img_exercise: '',
          description_exercise: '',
          beginer_exercise: '',
          inter_exercise: '',
          expert_exercise: '',
        };
      });
  }

}
