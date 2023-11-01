import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudVerEjerciciosPage } from './crud-ver-ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: CrudVerEjerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudVerEjerciciosPageRoutingModule {}
