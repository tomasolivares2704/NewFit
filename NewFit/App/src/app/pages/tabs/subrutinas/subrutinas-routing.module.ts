import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubrutinasPage } from './subrutinas.page';

const routes: Routes = [
  {
    path: '',
    component: SubrutinasPage
  },
  {
    path: 'crud-crear-ejercicio',
    loadChildren: () => import('./crud-crear-ejercicio/crud-crear-ejercicio.module').then( m => m.CrudCrearEjercicioPageModule)
  },
  {
    path: 'crud-ver-ejercicio',
    loadChildren: () => import('./crud-ver-ejercicios/crud-ver-ejercicios.module').then( m => m.CrudVerEjerciciosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubrutinasPageRoutingModule {}
