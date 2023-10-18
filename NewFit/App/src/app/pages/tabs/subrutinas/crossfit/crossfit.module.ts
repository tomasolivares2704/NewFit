import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrossfitPageRoutingModule } from './crossfit-routing.module';

import { CrossfitPage } from './crossfit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrossfitPageRoutingModule,
    SharedModule,
  ],
  declarations: [CrossfitPage]
})
export class CrossfitPageModule {}

