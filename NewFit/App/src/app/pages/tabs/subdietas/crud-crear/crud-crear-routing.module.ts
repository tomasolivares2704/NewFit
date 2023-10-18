import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudCrearPage } from './crud-crear.page';

import { FormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    component: CrudCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class CrudCrearPageRoutingModule {}
