import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrossfitPage } from './crossfit.page';

const routes: Routes = [
  {
    path: '',
    component: CrossfitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrossfitPageRoutingModule {}
