import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HitPage } from './hit.page';

const routes: Routes = [
  {
    path: '',
    component: HitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HitPageRoutingModule {}
