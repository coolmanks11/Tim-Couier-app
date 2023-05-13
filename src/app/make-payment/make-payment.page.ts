import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { CreateOrderDetailsService } from '../services/create-order-details.service';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first, lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
  paymentType: string = "card";
  // paymentForm: FormGroup;
  payer: string = "sender";
  deliveryFee!:number;
  data: any = {
    name: this.auth.getCurrentUser()?.uid,
    email: this.auth.getUserEmail(),
    currency: 'EUR'
  };

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private orderService: OrderService,
    private createOrderDetailsService: CreateOrderDetailsService,
    private router : Router,
    private http :HttpClient,
    private loadingController: LoadingController,
    private auth : AuthService
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
    this.deliveryFee = this.createOrderDetailsService.getOrdersDeliveryFee();
  }



  ngOnInit() {
    console.log('data' +JSON.stringify(this.data));
  }
  get amount() {
    return this.deliveryFee * 100;
  }
  
  checkPaymentType() {

  }
  async onSubmit() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.createOrder();
    await loading.dismiss();
    
  }
  async createOrder() {
    let orderDetails = this.createOrderDetailsService.getOrderDetails();
    orderDetails.payment.payment_type = this.paymentType;
    if (this.paymentType == 'cash') {
      orderDetails.payment.payer = this.payer;
    }
    this.orderService.createOrder(orderDetails);

    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'Created Order',
      buttons: ['OK'] 
    });
    await alert.present();
    this.createOrderDetailsService.resetOrderDetails();
    this.router.navigate(['list-orders']);

  }
  async makePaymentSheet() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    let paymentSuccessful = false;
    try {
      paymentSuccessful = await this.paymentSheet();
    } catch (e) {
      console.log('payment error: ',e);
      await this.presentErrorAlert('Payment Failure',"Please try again");

    }
    await loading.dismiss();
    console.log(paymentSuccessful);
    if (paymentSuccessful) {
      // await loading.present();
      await this.createOrder();
      // await loading.dismiss();
    }
  }
  async paymentSheet() {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
  
      const data$ = this.httpPost({ ...this.data, amount: this.amount });
  
      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);
  
      console.log('paymentIntent: ', paymentIntent);
  
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'TIM',
      });
  
      console.log('createPaymentSheet');
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.splitAndJoin(paymentIntent);
        return true;
      } else {
        throw new Error('PaymentSheet transaction failed');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async presentErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  
  splitAndJoin(paymentIntent:any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
  httpPost(body:any) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }



}
