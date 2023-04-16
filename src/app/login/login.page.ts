import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GoogleMapService } from '../services/google-map.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	credentials!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router,
		private googleMapService : GoogleMapService
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
		this.test();
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	async test() {
		const firstAddress = "133, rockfield manor, hoeys lane, dundalk, Co. Louth";
		const secondAddress = "91, rockfield manor, hoeys lane, dundalk, Co. Louth";
		const firstAddressLatLng = await this.getAddressLatLng(firstAddress);
		const secondAddressLatLng = await this.getAddressLatLng(secondAddress);
	
		if (firstAddressLatLng && secondAddressLatLng) {
			const distanceInMeters = await this.googleMapService.getDistanceBetweenLocations(
				firstAddressLatLng,
				secondAddressLatLng
			);
			console.log("Distance in meters:", distanceInMeters);
		} else {
			console.error("Error getting lat and lng for one or both addresses");
		}
	}
	
	submitLoginForm()
	{
		this.login();
	}
	async getAddressLatLng(address: string): Promise<{ lat: number; lng: number } | null> {
		try {
			const latLng = await this.googleMapService.getLatLngFromAddress(address);
			console.log('Latitude:', latLng.lat, 'Longitude:', latLng.lng);
			return latLng;
		} catch (error) {
			console.error('Error getting LatLng:', error);
			return null;
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
