import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimationPagePageRoutingModule } from './animation-page-routing.module';

import { AnimationPagePage } from './animation-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimationPagePageRoutingModule
  ],
  declarations: [AnimationPagePage]
})
export class AnimationPagePageModule {}
