import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HipercaloricoPageRoutingModule } from './hipercalorico-routing.module';

import { HipercaloricoPage } from './hipercalorico.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HipercaloricoPageRoutingModule,
    SharedModule,
  ],
  declarations: [HipercaloricoPage]
})
export class HipercaloricoPageModule {}
