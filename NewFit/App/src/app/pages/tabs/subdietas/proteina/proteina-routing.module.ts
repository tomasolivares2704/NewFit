import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProteinaPage } from './proteina.page';

const routes: Routes = [
  {
    path: '',
    component: ProteinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class ProteinaPageRoutingModule {}
