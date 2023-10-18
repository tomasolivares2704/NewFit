import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubrutinasPage } from './subrutinas.page';

const routes: Routes = [
  {
    path: '',
    component: SubrutinasPage
  },
  {
    path: 'crossfit',
    loadChildren: () => import('./crossfit/crossfit.module').then( m => m.CrossfitPageModule)
  },
  {
    path: 'crud-crear-ejercicio',
    loadChildren: () => import('./crud-crear-ejercicio/crud-crear-ejercicio.module').then( m => m.CrudCrearEjercicioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubrutinasPageRoutingModule {}
