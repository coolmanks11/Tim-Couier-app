import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create-order-details',
    loadChildren: () => import('./create-order-details/create-order-details.module').then( m => m.CreateOrderDetailsPageModule)
  },
  {
    path: 'create-order-details/:id',
    loadChildren: () => import('./create-order-details/create-order-details.module').then( m => m.CreateOrderDetailsPageModule)
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./make-payment/make-payment.module').then( m => m.MakePaymentPageModule)
  },
  {
    path: 'list-orders',
    loadChildren: () => import('./list-orders/list-orders.module').then( m => m.ListOrdersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
