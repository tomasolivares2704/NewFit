import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntropometricosPage } from './antropometricos.page';

const routes: Routes = [
  {
    path: '',
    component: AntropometricosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntropometricosPageRoutingModule {}
