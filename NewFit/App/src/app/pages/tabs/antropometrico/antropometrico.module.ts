import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntropometricoPageRoutingModule } from './antropometrico-routing.module';

import { AntropometricoPage } from './antropometrico.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntropometricoPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AntropometricoPage]
})
export class AntropometricoPageModule {}
