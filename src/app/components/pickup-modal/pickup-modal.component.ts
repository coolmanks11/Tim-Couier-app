import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {Order,Pickup} from '../../DTO/Order'
@Component({
  selector: 'app-pickup-modal',
  templateUrl: './pickup-modal.component.html',
  styleUrls: ['./pickup-modal.component.scss'],
})
export class PickupModalComponent implements OnInit {

  pickupForm!: FormGroup;
  pickup!: Pickup

  constructor(private modalCtrl: ModalController,private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.pickupForm = this.fb.group({
      pick_recipient_name: ['', Validators.required],
      pick_recipient_address: ['', Validators.required],
      pick_recipient_city: ['', Validators.required],
      pick_recipient_county: ['', Validators.required],
      pick_recipient_eircode: ['', Validators.required],
      pick_recipient_phone: ['', Validators.required],
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    return this.modalCtrl.dismiss(this.pickupForm.value, 'confirm');
  }
}
