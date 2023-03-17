import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  where,
  query,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { createOrderDetails } from '../DTO/createOrderDetailsDto';
import { Order } from '../DTO/Order';
import { AuthService } from '../services/auth.service';
import { Counter } from '../DTO/Counter'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: Firestore, private auth: AuthService) { }

  async createOrder(createOrderDetailsDto: createOrderDetails) {
    const orderRef = collection(this.firestore, 'orders')
    const currUser = this.auth.getCurrentUser();
    if (currUser !== null) {
      const order: Order = {
        user_id: currUser.uid,
        pickup: {
          pick_recipient_name: createOrderDetailsDto.pickup.pick_recipient_name,
          pick_recipient_address: createOrderDetailsDto.pickup.pick_recipient_address,
          pick_recipient_city: createOrderDetailsDto.pickup.pick_recipient_city,
          pick_recipient_county: createOrderDetailsDto.pickup.pick_recipient_county,
          pick_recipient_eircode: createOrderDetailsDto.pickup.pick_recipient_eircode,
          pick_recipient_phone: createOrderDetailsDto.pickup.pick_recipient_phone,
        },
        dropoff: {
          drop_recipient_name: createOrderDetailsDto.dropoff.drop_recipient_name,
          drop_recipient_address: createOrderDetailsDto.dropoff.drop_recipient_address,
          drop_recipient_city: createOrderDetailsDto.dropoff.drop_recipient_city,
          drop_recipient_county: createOrderDetailsDto.dropoff.drop_recipient_county,
          drop_recipient_eircode: createOrderDetailsDto.dropoff.drop_recipient_eircode,
          drop_recipient_phone: createOrderDetailsDto.dropoff.drop_recipient_phone,
        },
        payment: {
          payment_type: createOrderDetailsDto.payment.payment_type,
        },
        status: "In progress",
        delivery_mode: createOrderDetailsDto.delivery_mode,
        created_date: createOrderDetailsDto.created_date,
        pick_up_time: createOrderDetailsDto.pick_up_time,

      };

      addDoc(orderRef, order);
    }
  }
  getOrdersByUserId(userId: string){
    const ordersRef = collection(this.firestore, 'orders');
    const queryRef = query(ordersRef, where('user_id', '==', userId));
    return collectionData(queryRef, { idField: 'order_id'}) as Observable<Order[]> ;
  }
  getOrderCounter(): Observable<number> {
    const counterRef = doc(this.firestore, 'counters/order');
    return docData<any>(counterRef)
  }
  getOrderByOrderId(orderId : string)  {
      const orderRef = doc(this.firestore,`orders/${orderId}`);
      return docData(orderRef, {idField:'order_id'}) as Observable<Order>

  }
}
