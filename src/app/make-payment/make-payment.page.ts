import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { CreateOrderDetailsService } from '../services/create-order-details.service';
@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
  paymentType: string = "card";
  paymentForm: FormGroup;
  payer: string = "sender";

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private orderService: OrderService,
    private createOrderDetailsService: CreateOrderDetailsService,
    private router : Router
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{16}$')])],
      expiryDate: ['', Validators.compose([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])[/]([0-9]{2})$')])],
      cvv: ['', Validators.compose([Validators.required, Validators.pattern('^\\d{3}$')])],
      amount: ['', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])]
    });
  }



  ngOnInit() {
  }
  checkPaymentType() {

  }
  async onSubmit() {
    if (this.paymentForm.valid) {
      const cardNumber = this.paymentForm.value.cardNumber;
      const expiryDate = this.paymentForm.value.expiryDate.split('/');
      const cvv = this.paymentForm.value.cvv;
      const amount = this.paymentForm.value.amount;

      //   const token = await this.stripe.createCardToken({
      //     number: cardNumber,
      //     expMonth: parseInt(expiryDate[0], 10),
      //     expYear: parseInt(expiryDate[1], 10),
      //     cvc: cvv
      //   });

      //   // Process payment using token and amount

      //   const alert = await this.alertController.create({
      //     header: 'Payment Successful',
      //     message: `Your payment of $${amount} has been successfully processed.`,
      //     buttons: ['OK']
      //   });

      //   await alert.present();
      // } else {
      //   const alert = await this.alertController.create({
      //     header: 'Invalid Form',
      //     message: 'Please correct the errors in the form and try again.',
      //     buttons: ['OK']
      //   });

      //   await alert.present();
    }
    this.createOrder();
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
    this.router.navigate(['home']);
  }


}
