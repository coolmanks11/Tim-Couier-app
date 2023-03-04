import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {Order,Pickup} from '../../DTO/Order'

@Component({
  selector: 'app-dropoff-modal',
  templateUrl: './dropoff-modal.component.html',
  styleUrls: ['./dropoff-modal.component.scss'],
})
export class DropoffModalComponent implements OnInit {

  dropoffForm!: FormGroup;
  pickup!: Pickup

  constructor(private modalCtrl: ModalController,private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.dropoffForm = this.fb.group({
      drop_recipient_name: ['', Validators.required],
      drop_recipient_address: ['', Validators.required],
      drop_recipient_city: ['', Validators.required],
      drop_recipient_county: ['', Validators.required],
      drop_recipient_eircode: ['', Validators.required],
      drop_recipient_phone: ['', Validators.required],
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    return this.modalCtrl.dismiss(this.dropoffForm.value, 'confirm');
  }
}

