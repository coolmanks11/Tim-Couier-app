import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickUpFormPageRoutingModule } from './pick-up-form-routing.module';

import { PickUpFormPage } from './pick-up-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpFormPageRoutingModule
  ],
  declarations: [PickUpFormPage]
})
export class PickUpFormPageModule {}
