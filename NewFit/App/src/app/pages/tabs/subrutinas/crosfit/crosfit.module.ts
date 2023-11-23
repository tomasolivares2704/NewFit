import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrosfitPageRoutingModule } from './crosfit-routing.module';

import { CrosfitPage } from './crosfit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrosfitPageRoutingModule,
    SharedModule,
  ],
  declarations: [CrosfitPage]
})
export class CrosfitPageModule {}
