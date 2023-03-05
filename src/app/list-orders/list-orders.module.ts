import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOrdersPageRoutingModule } from './list-orders-routing.module';

import { ListOrdersPage } from './list-orders.page';
import { SharedModuleModule } from '../modules/shared-module/shared-module.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOrdersPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [ListOrdersPage]
})
export class ListOrdersPageModule {}
