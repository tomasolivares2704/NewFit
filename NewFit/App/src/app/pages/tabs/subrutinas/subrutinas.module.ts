import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubrutinasPageRoutingModule } from './subrutinas-routing.module';

import { SubrutinasPage } from './subrutinas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubrutinasPageRoutingModule,
    SharedModule,
  ],
  declarations: [SubrutinasPage]
})
export class SubrutinasPageModule {}
