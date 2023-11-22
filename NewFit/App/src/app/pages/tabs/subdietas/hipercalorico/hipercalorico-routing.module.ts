import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HipercaloricoPage } from './hipercalorico.page';

const routes: Routes = [
  {
    path: '',
    component: HipercaloricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HipercaloricoPageRoutingModule {}
