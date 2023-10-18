import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudCrearEjercicioPage } from './crud-crear-ejercicio.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CrudCrearEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class CrudCrearEjercicioPageRoutingModule {}
