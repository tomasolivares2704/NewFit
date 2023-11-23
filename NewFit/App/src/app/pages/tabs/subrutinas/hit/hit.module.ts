import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HitPageRoutingModule } from './hit-routing.module';

import { HitPage } from './hit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HitPageRoutingModule
  ],
  declarations: [HitPage]
})
export class HitPageModule {}
