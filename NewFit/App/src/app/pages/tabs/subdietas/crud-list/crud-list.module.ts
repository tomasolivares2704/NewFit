import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudListPageRoutingModule } from './crud-list-routing.module';

import { CrudListPage } from './crud-list.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudListPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [CrudListPage]
})
export class CrudListPageModule {}
