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
    this.getPage();
  }
  getPage() {
    console.log('hello');
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state) {
      const currentPage = navigation.extras.state;
      console.log('asdsa'+currentPage); // Outputs the name of the current page
    }
  }
}
