import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {SideMenuComponent } from '../components/side-menu/side-menu.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';
import { PickupModalComponent } from '../components/pickup-modal/pickup-modal.component';
import { DropoffModalComponent } from '../components/dropoff-modal/dropoff-modal.component';
import { DateModalComponent } from '../components/date-modal/date-modal.component';
import {SharedModuleModule} from '../modules/shared-module/shared-module.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ],
  declarations: [HomePage,SideMenuComponent,PickupModalComponent,DropoffModalComponent,DateModalComponent]
})
export class HomePageModule {}
