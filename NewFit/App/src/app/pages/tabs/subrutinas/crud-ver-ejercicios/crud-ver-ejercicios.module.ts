import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudVerEjerciciosPageRoutingModule } from './crud-ver-ejercicios-routing.module';

import { CrudVerEjerciciosPage } from './crud-ver-ejercicios.page';

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudVerEjerciciosPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CrudVerEjerciciosPage]
})
export class CrudVerEjerciciosPageModule {}
