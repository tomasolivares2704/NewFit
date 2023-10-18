import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubdietasPageRoutingModule } from './subdietas-routing.module';

import { SubdietasPage } from './subdietas.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubdietasPageRoutingModule,
    SharedModule,
  ],
  declarations: [SubdietasPage]
})
export class SubdietasPageModule {}
