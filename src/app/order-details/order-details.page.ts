import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from '../services/order.service';
import { Order } from '../DTO/Order';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  id : any;
  orderDetails! : Order ;
  constructor(
    private actRoute: ActivatedRoute,
    private orderService : OrderService,
  ){
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getOrderByOrderId(this.id);
  }

  ngOnInit() {
    console.log('id' + this.id);
  }
  getOrderByOrderId(id :string){
    const order = this.orderService.getOrderByOrderId(id).subscribe(res=>{
      this.orderDetails = res;

    });

  }

}
