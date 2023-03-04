import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {


  }

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
    
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			firstname: ['', [Validators.required]],
			lastname: ['', [Validators.required]]
		});
	}
  submitReisterForm()
  {
    this.register();
  }
	async register() {
    
		const loading = await this.loadingController.create();
		await loading.present();
    console.log("password"+this.credentials.controls["password"].value+ "email"+
    this.credentials.controls["email"].value+
    this.credentials.controls["lastname"].value+
    this.credentials.controls["firstname"].value);  
		const user = await this.authService.register(
      this.credentials.controls["email"].value,
      this.credentials.controls["password"].value,
      this.credentials.controls["lastname"].value,
      this.credentials.controls["firstname"].value,
      
      );
		console.log(user);
		
		await loading.dismiss();

		if (user) {
			var id = user.user.uid;
			// var token = user.user.getIdToken;
			localStorage.setItem('userId', id);
			// localStorage.setItem('token',JSON.stringify(token));
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			console.log("register fail");
			this.showAlert('Registration failed', 'Please try again!');
		}
	}

	
	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.credentials.controls["email"].value,this.credentials.controls["password"].value,);
		await loading.dismiss();


		if (user) {
			var id = user.user.uid;
			// var token = user.user.getIdToken;
			localStorage.setItem('userId', id);
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Login failed', 'Please try again!');
		}
	}

	async showAlert(header:string, message:string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}
}
