import { Component, OnInit } from '@angular/core';
import { Order } from '../DTO/Order';
import { OrderService } from '../services/order.service';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.page.html',
  styleUrls: ['./list-orders.page.scss'],
})
export class ListOrdersPage implements OnInit {

  constructor(private orderservice: OrderService, private auth: AuthService) { 
    
  }
  orders: Order[] = [];
  orderId_counter : number = 0;
  ngOnInit() {
    this.getOrders();

  }
  onIonViewDidEnter():void{
    this.getOrders();
    
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getOrders();
      event.target.complete();
    }, 2000);
  };
  getOrders() {
    const user = this.auth.getCurrentUser();
    if (user !== null) {
      this.orderservice.getOrdersByUserId(user.uid).subscribe(
        orders => {
          this.orders = orders

        },
      );
    }
    

  }
  // refresh(){
  //   this.getOrders();
  // }
  getOrderByOrderId(id : string){
    this.orderservice.getOrderByOrderId(id).subscribe(orders =>{
      
    })
  }

}
