import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderDetailsPage } from './create-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: CreateOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrderDetailsPageRoutingModule {}
