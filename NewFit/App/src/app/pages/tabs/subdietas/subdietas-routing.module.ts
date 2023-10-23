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
    path: 'crud-list',
    loadChildren: () => import('./crud-list/crud-list.module').then( m => m.CrudListPageModule)
  },
  {
    path: 'crud-put',
    loadChildren: () => import('./crud-put/crud-put.module').then( m => m.CrudPutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubdietasPageRoutingModule {}
