import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController,ModalController} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PickupModalComponent } from '../components/pickup-modal/pickup-modal.component';
import { createOrderDetails } from '../DTO/createOrderDetailsDto';
import { Dropoff,Pickup } from '../DTO/createOrderDetailsDto';
import { DropoffModalComponent } from '../components/dropoff-modal/dropoff-modal.component';
import { DateModalComponent } from '../components/date-modal/date-modal.component';
import {CreateOrderDetailsService } from '../services/create-order-details.service'
import { format,parseISO } from 'date-fns';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  senderName = 'Sender Address';
  receiverName = 'Receiver Adresss';
  pickupDetails! : Pickup;
  dropoffDetails! : Dropoff;
  formattedDateString : string ='Pick date';
  option!: string ;
	credentials!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
    private modalCtrl: ModalController,
    private createOrderService : CreateOrderDetailsService
	) {
    
  }
  ngOnInit() {

    this.createForm();
	}
  createForm(){
		this.credentials = this.fb.group({

		});

  }
  async openPickUpModal() {
    const modal = await this.modalCtrl.create({
      component: PickupModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.pickupDetails = data
      this.senderName  = this.pickupDetails.pick_recipient_name
      console.log(JSON.stringify(this.pickupDetails))
    }
  }
  async openDropOffModal() {
    const modal = await this.modalCtrl.create({
      component: DropoffModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.dropoffDetails = data
      this.receiverName  = this.dropoffDetails.drop_recipient_name
      console.log(JSON.stringify(this.dropoffDetails))
    }
  }
  async openDateModal() {
    const modal = await this.modalCtrl.create({
      component: DateModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data)
      this.formattedDateString = data
      console.log(this.formattedDateString)
    }
  }
  deliveryOption(event:any){
    this.option = event.target.value;
    console.log(this.option);
  }

  submit()
  {

    let createOrder: createOrderDetails = {
      pickup: {
        pick_recipient_name: this.pickupDetails.pick_recipient_name,
        pick_recipient_address: this.pickupDetails.pick_recipient_address,
        pick_recipient_city: this.pickupDetails.pick_recipient_city,
        pick_recipient_county: this.pickupDetails.pick_recipient_county,
        pick_recipient_eircode: this.pickupDetails.pick_recipient_eircode,
        pick_recipient_phone: this.pickupDetails.pick_recipient_phone,
      },
      dropoff: {
        drop_recipient_name: this.dropoffDetails.drop_recipient_name,
        drop_recipient_address: this.dropoffDetails.drop_recipient_address,
        drop_recipient_city: this.dropoffDetails.drop_recipient_city,
        drop_recipient_county: this.dropoffDetails.drop_recipient_county,
        drop_recipient_eircode: this.dropoffDetails.drop_recipient_eircode,
        drop_recipient_phone: this.dropoffDetails.drop_recipient_phone
      },
      payment:{
        payment_type : ''
      },
      delivery_mode: this.option,
      created_date: format(parseISO(format(new Date(),'yyyy-MM-dd HH:mm:ss')),'HH:mm, MMM d, yyyy'),
      pick_up_time: this.formattedDateString,
    };
    console.log(createOrder);
    this.createOrderService.setOrderDetails(createOrder);
    this.router.navigate(['create-order-details']);
  
    // //using localstorage
    // let createOrderDetails = {
    //         pickup: this.pickupDetails,
    //         dropoff: this.dropoffDetails,
    //         pick_up_time: this.formattedDateString,
    //         delivery_mode: this.option
    // } 
    // console.log('home'+ JSON.stringify(createOrderDetails));
    // localStorage.setItem('createOrderDetails',JSON.stringify(createOrderDetails));
    // this.router.navigate(['create-order-details']);

    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     orderDetails :{
    //       pickup: this.pickupDetails,
    //       dropoff: this.dropoffDetails,
    //       pick_up_time: this.formattedDateString,
    //       delivery_mode: this.option
    //     } 
    //   }
    // };
    
    // console.log(navigationExtras.state);
    // this.router.navigate(['create-order-details'],navigationExtras);
  }
}
