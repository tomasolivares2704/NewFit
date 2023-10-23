import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudPutPage } from './crud-put.page';

const routes: Routes = [
  {
    path: '',
    component: CrudPutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudPutPageRoutingModule {}
