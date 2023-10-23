import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntropometricoPage } from './antropometrico.page';

const routes: Routes = [
  {
    path: '',
    component: AntropometricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntropometricoPageRoutingModule {}
