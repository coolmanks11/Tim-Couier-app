import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-nav-previous-btn',
  templateUrl: './nav-previous-btn.component.html',
  styleUrls: ['./nav-previous-btn.component.scss'],
})
export class NavPreviousBtnComponent implements OnInit {

  constructor(private navController: NavController, private router : Router) { }

  ngOnInit() {}
  goBack() {
    this.navController.back();
  }

}
