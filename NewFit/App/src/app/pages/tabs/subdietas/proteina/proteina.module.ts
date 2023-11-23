import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProteinaPageRoutingModule } from './proteina-routing.module';

import { ProteinaPage } from './proteina.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProteinaPageRoutingModule,
    SharedModule,
  ],
  declarations: [ProteinaPage]
})
export class ProteinaPageModule {}
