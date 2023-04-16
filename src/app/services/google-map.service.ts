import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {


  constructor(private http: HttpClient) {}
  
  getDistanceBetweenLocations(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<number> {
    const apiKey = 'AIzaSyDZVDyOjD9f1mzvxjYG0_uodQZzv0VJtew'; 
    const originString = `${origin.lat},${origin.lng}`;
    const destinationString = `${destination.lat},${destination.lng}`;
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originString}&destinations=${destinationString}&units=metric&key=${apiKey}`;

    const testUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=AIzaSyDZVDyOjD9f1mzvxjYG0_uodQZzv0VJtew"
    console.log(testUrl);
  
    return new Promise((resolve, reject) => {
      this.http.get(testUrl).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            const result = response.rows[0].elements[0];
            if (result.status === 'OK') {
              const distanceInMeters = result.distance.value;
              resolve(distanceInMeters);
            } else {
              reject('Distance Matrix failed: ' + result.status);
            }
          } else {
            reject('Distance Matrix API failed: ' + response.status);
          }
        },
        (error) => {
          reject('Error making the API request: ' + error.message);
        }
      );
    });
  }
  

  
  getLatLngFromAddress(address: string): Promise<{ lat: number; lng: number }> {
    const apiKey = 'AIzaSyDZVDyOjD9f1mzvxjYG0_uodQZzv0VJtew'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
  
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            const result = response.results[0];
            const location = result.geometry.location;
            resolve({ lat: location.lat, lng: location.lng });
          } else {
            reject('Geocoding failed: ' + response.status);
          }
        },
        (error) => {
          reject('Error making the API request: ' + error.message);
        }
      );
    });
  }
  
}
