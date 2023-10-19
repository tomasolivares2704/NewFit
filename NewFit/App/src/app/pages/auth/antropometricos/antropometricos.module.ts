import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntropometricosPageRoutingModule } from './antropometricos-routing.module';

import { AntropometricosPage } from './antropometricos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntropometricosPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AntropometricosPage],
})
export class AntropometricosPageModule {}
