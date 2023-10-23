import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudPutPageRoutingModule } from './crud-put-routing.module';

import { CrudPutPage } from './crud-put.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudPutPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    
  ],
  declarations: [CrudPutPage]
})
export class CrudPutPageModule {}
