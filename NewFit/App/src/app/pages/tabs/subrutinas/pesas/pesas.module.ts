import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesasPageRoutingModule } from './pesas-routing.module';

import { PesasPage } from './pesas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesasPageRoutingModule,
    SharedModule,
  ],
  declarations: [PesasPage]
})
export class PesasPageModule {}
