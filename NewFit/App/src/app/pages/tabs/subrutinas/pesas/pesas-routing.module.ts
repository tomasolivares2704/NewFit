import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesasPage } from './pesas.page';

const routes: Routes = [
  {
    path: '',
    component: PesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesasPageRoutingModule {}
