import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HipocaloricoPageRoutingModule } from './hipocalorico-routing.module';

import { HipocaloricoPage } from './hipocalorico.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HipocaloricoPageRoutingModule,
    SharedModule,
  ],
  declarations: [HipocaloricoPage]
})
export class HipocaloricoPageModule {}
