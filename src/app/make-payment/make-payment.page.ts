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
    // this.paymentForm = this.fb.group({
    //   cardNumber: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{16}$')])],
    //   expiryDate: ['', Validators.compose([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])([0-9]{2})$')])],
    //   cvv: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{3}$')])],
    //   amount: ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])]
    // });
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
    // if (this.paymentForm.valid) {
    //   const cardNumber = this.paymentForm.value.cardNumber;
    //   const expiryDate = this.paymentForm.value.expiryDate.split('/');
    //   const cvv = this.paymentForm.value.cvv;
    //   const amount = this.paymentForm.value.amount;

    //   //   const token = await this.stripe.createCardToken({
    //   //     number: cardNumber,
    //   //     expMonth: parseInt(expiryDate[0], 10),
    //   //     expYear: parseInt(expiryDate[1], 10),
    //   //     cvc: cvv
    //   //   });

    //   //   // Process payment using token and amount

    //   //   const alert = await this.alertController.create({
    //   //     header: 'Payment Successful',
    //   //     message: `Your payment of $${amount} has been successfully processed.`,
    //   //     buttons: ['OK']
    //   //   });

    //   //   await alert.present();
    //   // } else {
    //   //   const alert = await this.alertController.create({
    //   //     header: 'Invalid Form',
    //   //     message: 'Please correct the errors in the form and try again.',
    //   //     buttons: ['OK']
    //   //   });

    //   //   await alert.present();
    // }
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
  async paymentFlow() {
    /* 
    With PaymentFlow, you can make payments in two steps flow. 
    When the user presses the submit button, 
    the system only gets the card information, 
    and puts it in a pending state. 
    After that, when the program executes the confirmation method, 
    the payment is executed. In most cases, 
    it is used in a flow that is interrupted by a final confirmation screen.
    */

    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });
    
    // const data = new HttpParams({
    //   fromObject: this.data
    // });
  
    // Connect to your backend endpoint, and get every key.
    // const data$ = this.http.post<{
    //   paymentIntent: string;
    //   ephemeralKey: string;
    //   customer: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());

    const data$ = this.httpPost(this.data);

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    // Prepare PaymentFlow with CreatePaymentFlowOption.
    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      // setupIntentClientSecret: setupIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'TIM'
    });

    // Present PaymentFlow. **Not completed yet.**
    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

    // Confirm PaymentFlow. Completed.
    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);
    if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }
  async applePay() {
    // Check to be able to use Apple Pay on device
  const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
  if (isAvailable === undefined) {
    // disable to use Google Pay
    return;
  }

  // be able to get event of Apple Pay
  Stripe.addListener(ApplePayEventsEnum.Completed, () => {
    console.log('ApplePayEventsEnum.Completed');
  });
  
  // const data = new HttpParams({
  //   fromObject: this.data
  // });
  
  // Connect to your backend endpoint, and get paymentIntent.
  // const data$ = this.http.post<{
  //   paymentIntent: string;
  // }>(environment.api + 'payment-sheet', data).pipe(first());

  const data$ = this.httpPost(this.data);

  const { paymentIntent } = await lastValueFrom(data$);

  // Prepare Apple Pay
  await Stripe.createApplePay({
    paymentIntentClientSecret: paymentIntent,
    paymentSummaryItems: [{
      label: 'TIM',
      amount: 1099.00
    }],
    merchantIdentifier: 'TIM',
    countryCode: 'EU',
    currency: 'EUR',
  });

  // Present Apple Pay
  const result = await Stripe.presentApplePay();
  if (result.paymentResult === ApplePayEventsEnum.Completed) {
    // Happy path
    this.splitAndJoin(paymentIntent);
  }
}

async googlePay() {
  // Check to be able to use Google Pay on device
  const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
  if (isAvailable === undefined) {
    // disable to use Google Pay
    return;
  }

  Stripe.addListener(GooglePayEventsEnum.Completed, () => {
    console.log('GooglePayEventsEnum.Completed');
  });
  
  // const data = new HttpParams({
  //   fromObject: this.data
  // });
  
  // Connect to your backend endpoint, and get paymentIntent.
  // const data$= this.http.post<{
  //   paymentIntent: string;
  // }>(environment.api + 'payment-sheet', data).pipe(first());

  const data$ = this.httpPost(this.data);

  const { paymentIntent } = await lastValueFrom(data$);

  // Prepare Google Pay
  await Stripe.createGooglePay({
    paymentIntentClientSecret: paymentIntent,

    // Web only. Google Pay on Android App doesn't need
    paymentSummaryItems: [{
      label: 'TIM',
      amount: 1099.00
    }],
    merchantIdentifier: 'TIM',
    countryCode: 'IE',
    currency: 'EUR',
  });

  // Present Google Pay
  const result = await Stripe.presentGooglePay();
  if (result.paymentResult === GooglePayEventsEnum.Completed) {
    // Happy path
    this.splitAndJoin(paymentIntent);
  }
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
