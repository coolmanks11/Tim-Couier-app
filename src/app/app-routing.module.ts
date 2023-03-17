import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
