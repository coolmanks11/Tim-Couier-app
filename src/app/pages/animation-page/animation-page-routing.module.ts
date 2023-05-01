import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimationPagePage } from './animation-page.page';

const routes: Routes = [
  {
    path: '',
    component: AnimationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimationPagePageRoutingModule {}
