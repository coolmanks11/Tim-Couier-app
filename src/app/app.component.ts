import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Navigation, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private navCtrl: NavController, private router: Router) {}
	ngOnInit() {
    this.showTabMenu();
  }
  showTabMenu() {
    console.log('route : ' + this.router.url);
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url === '';
  }
}
