import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickUpFormPage } from './pick-up-form.page';

const routes: Routes = [
  {
    path: '',
    component: PickUpFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickUpFormPageRoutingModule {}
