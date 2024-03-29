import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';
import {LogoutButtonComponent} from '../../components/logout-button/logout-button.component';
import {PickupModalComponent} from '../../components/pickup-modal/pickup-modal.component';
import {DropoffModalComponent} from '../../components/dropoff-modal/dropoff-modal.component';
import {DateModalComponent} from '../../components/date-modal/date-modal.component';
import {NavPreviousBtnComponent} from '../../components/nav-previous-btn/nav-previous-btn.component'

import {TabMenuComponent} from '../../components/tab-menu/tab-menu.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [NavPreviousBtnComponent,LogoutButtonComponent,SideMenuComponent,TabMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,  
    // HomePageRoutingModule,
    // ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[NavPreviousBtnComponent,LogoutButtonComponent,SideMenuComponent,TabMenuComponent]
})
export class SharedModuleModule { }
