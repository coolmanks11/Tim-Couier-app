import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format,parseISO } from 'date-fns';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.scss'],
})
export class DateModalComponent implements OnInit {

  date : any;
  formattedDateString! :string
  constructor(private modalCtrl: ModalController) { 
    this.setCurrerntTime()
  }

  ngOnInit() {}
  setCurrerntTime(){
    this.formattedDateString = format(parseISO(format(new Date(),'yyyy-MM-dd HH:mm:ss')),'HH:mm, MMM d, yyyy')

  }
  dateChange(date:any)  
  {
    console.log(this.date, typeof date);  
    this.formattedDateString = format(parseISO(date),'HH:mm,MMM d, yyyy');

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  confirm() {
    return this.modalCtrl.dismiss(this.formattedDateString, 'confirm');
  }
}
