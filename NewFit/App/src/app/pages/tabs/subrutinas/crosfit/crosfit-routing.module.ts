import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrosfitPage } from './crosfit.page';

const routes: Routes = [
  {
    path: '',
    component: CrosfitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrosfitPageRoutingModule {}
