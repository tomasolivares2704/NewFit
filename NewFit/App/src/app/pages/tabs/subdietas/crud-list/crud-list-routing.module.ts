import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudListPage } from './crud-list.page';

const routes: Routes = [
  {
    path: '',
    component: CrudListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudListPageRoutingModule {}
