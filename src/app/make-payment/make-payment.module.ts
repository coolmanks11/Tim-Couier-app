import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakePaymentPageRoutingModule } from './make-payment-routing.module';

import { MakePaymentPage } from './make-payment.page';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModuleModule} from '../modules/shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakePaymentPageRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ],
  declarations: [MakePaymentPage]
})
export class MakePaymentPageModule {}
