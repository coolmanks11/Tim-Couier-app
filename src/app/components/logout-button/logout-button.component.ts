import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
		private alertController: AlertController,
    ) { }

  ngOnInit() {}
  logout()
  {
    console.log("logout"+localStorage.getItem("userId"));
    if(localStorage.getItem("userId")!=null)
    {
      localStorage.clear();
       this.authService.logout();
       this.logOutAlert("Logged Out");
    }else{
    console.log("no user login ");
    }
    this.router.navigateByUrl('/login');
  }
  async logOutAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
