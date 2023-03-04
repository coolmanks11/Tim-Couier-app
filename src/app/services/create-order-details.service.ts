import { Injectable } from '@angular/core';
import { createOrderDetails ,Dropoff,Pickup} from '../DTO/createOrderDetailsDto';
@Injectable({
  providedIn: 'root'
})
export class CreateOrderDetailsService {
  orderDetails: createOrderDetails = {
    pickup: {
      pick_recipient_name: '',
      pick_recipient_address: '',
      pick_recipient_city: '',
      pick_recipient_county: '',
      pick_recipient_eircode: '',
      pick_recipient_phone: 0,
    },
    dropoff: {
      drop_recipient_name: '',
      drop_recipient_address: '',
      drop_recipient_city: '',
      drop_recipient_county: '',
      drop_recipient_eircode: '',
      drop_recipient_phone: 0,
    },
    payment: {
      payment_type: '',
    },
    delivery_mode: '',
    created_date: '',
    pick_up_time: '',

  };
  constructor() { }
  getOrderDetails(){
    return this.orderDetails
  }
  setOrderDetails(od : createOrderDetails){
    this.orderDetails = od
  }
}
