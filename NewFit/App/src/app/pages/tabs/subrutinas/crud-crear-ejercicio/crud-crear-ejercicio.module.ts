import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudCrearEjercicioPageRoutingModule } from './crud-crear-ejercicio-routing.module';

import { CrudCrearEjercicioPage } from './crud-crear-ejercicio.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudCrearEjercicioPageRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [CrudCrearEjercicioPage]
})
export class CrudCrearEjercicioPageModule {}
