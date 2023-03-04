import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { create } from 'domain';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { createOrderDetails } from '../DTO/createOrderDetailsDto';
import { OrderDetails } from '../DTO/OrderDetails';
import {CreateOrderDetailsService } from '../services/create-order-details.service'
@Component({
  selector: 'app-create-order-details',
  templateUrl: './create-order-details.page.html',
  styleUrls: ['./create-order-details.page.scss'],
})
export class CreateOrderDetailsPage implements OnInit {
  orderDetails : OrderDetails = {}

  constructor(private route: ActivatedRoute,
    private router:Router,
    private createOrder : CreateOrderDetailsService,
    
    ) {

   }
  ngOnInit() {
    this.getOrderDetails()
  }
  getOrderDetails(){
    this.orderDetails = this.createOrder.getOrderDetails();
  }
  makePayment(){

    this.router.navigate(['make-payment']);
  }
}
