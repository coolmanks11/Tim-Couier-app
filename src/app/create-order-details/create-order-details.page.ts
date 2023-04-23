import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationExtras, Router } from '@angular/router';
import { create } from 'domain';
import { createOrderDetails } from '../DTO/createOrderDetailsDto';
import { OrderDetails } from '../DTO/OrderDetails';
import { CreateOrderDetailsService } from '../services/create-order-details.service'
import { GoogleMapService } from '../services/google-map.service';
@Component({
  selector: 'app-create-order-details',
  templateUrl: './create-order-details.page.html',
  styleUrls: ['./create-order-details.page.scss'],
})
export class CreateOrderDetailsPage implements OnInit {
  orderDetails: OrderDetails = {}
  duration !:number ;
  distance !:number;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private createOrder: CreateOrderDetailsService,
    private googleMapService: GoogleMapService,
  ) {

  }
  ngOnInit() {
    this.orderDetailsInit();
  }
  async orderDetailsInit() {
    this.getOrderDetails();
  };
  getOrderDetails() {
    this.orderDetails = this.createOrder.getOrderDetails();
  }
 
  makePayment() {

    this.router.navigate(['make-payment']);
  }
}
