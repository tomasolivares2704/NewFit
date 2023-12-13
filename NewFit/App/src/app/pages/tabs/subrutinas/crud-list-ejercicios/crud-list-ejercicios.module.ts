import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudListEjerciciosPageRoutingModule } from './crud-list-ejercicios-routing.module';

import { CrudListEjerciciosPage } from './crud-list-ejercicios.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudListEjerciciosPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [CrudListEjerciciosPage]
})
export class CrudListEjerciciosPageModule {}
