import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCrearPageRoutingModule } from './crud-crear-routing.module';

import { CrudCrearPage } from './crud-crear.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [CrudCrearPage]
})
export class CrudCrearPageModule {}
