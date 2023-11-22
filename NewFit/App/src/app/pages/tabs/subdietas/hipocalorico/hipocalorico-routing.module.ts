import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HipocaloricoPage } from './hipocalorico.page';

const routes: Routes = [
  {
    path: '',
    component: HipocaloricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HipocaloricoPageRoutingModule {}
