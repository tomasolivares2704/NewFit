import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubdietasPage } from './subdietas.page';

const routes: Routes = [
  {
    path: '',
    component: SubdietasPage
  },
  {
    path: 'proteina',
    loadChildren: () => import('./proteina/proteina.module').then( m => m.ProteinaPageModule)
  },
  {
    path: 'crud-crear',
    loadChildren: () => import('./crud-crear/crud-crear.module').then( m => m.CrudCrearPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubdietasPageRoutingModule {}
