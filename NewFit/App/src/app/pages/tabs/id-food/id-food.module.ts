import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdFoodPageRoutingModule } from './id-food-routing.module';

import { IdFoodPage } from './id-food.page';
import { ProteinaPageModule } from '../subdietas/proteina/proteina.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdFoodPageRoutingModule,
    ProteinaPageModule,
  ],
  declarations: [IdFoodPage]
})
export class IdFoodPageModule {}
