import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrderDetailsPageRoutingModule } from './create-order-details-routing.module';

import { CreateOrderDetailsPage } from './create-order-details.page';
import {SharedModuleModule} from '../modules/shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrderDetailsPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [CreateOrderDetailsPage]
})
export class CreateOrderDetailsPageModule {}
