import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudListEjerciciosPage } from './crud-list-ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: CrudListEjerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudListEjerciciosPageRoutingModule {}
