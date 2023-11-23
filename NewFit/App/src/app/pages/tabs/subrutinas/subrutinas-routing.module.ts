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
  },
  {
    path: 'crosfit',
    loadChildren: () => import('./crosfit/crosfit.module').then( m => m.CrosfitPageModule)
  },
  {
    path: 'hit',
    loadChildren: () => import('./hit/hit.module').then( m => m.HitPageModule)

    path: 'crossfit',
    loadChildren: () => import('./crossfit/crossfit.module').then( m => m.CrossfitPageModule)

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubrutinasPageRoutingModule {}
