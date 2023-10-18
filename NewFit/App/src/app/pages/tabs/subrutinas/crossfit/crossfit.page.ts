import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/interfaces/exercises';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-crossfit',
  templateUrl: './crossfit.page.html',
  styleUrls: ['./crossfit.page.scss'],
})
export class CrossfitPage implements OnInit {

  constructor(private CrudService: CrudService) { }

  ejercicios: Ejercicio[]

  ngOnInit() {
    this.getEjercicios();
  }

  getEjercicios() {
    this.CrudService.getAllEjercicios()
      .subscribe(ejercicios => {
        this.ejercicios = ejercicios;
      });
  }

}
