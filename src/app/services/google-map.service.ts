import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loader } from "@googlemaps/js-api-loader";
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {


  constructor(private http: HttpClient) { }
  // test2(){
  //   const url = "https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC&units=imperial&key=AIzaSyDZVDyOjD9f1mzvxjYG0_uodQZzv0VJtew"
  //   this.http.get(url).subscribe(res =>{
  //     console.log(res);
  //     return res;
  //   })

  // }

  async initMap(): Promise<void> {
    const loader = new Loader({ apiKey: "AIzaSyDZVDyOjD9f1mzvxjYG0_uodQZzv0VJtew" });
    await loader.load();
  }
  getDistanceBetweenAddress(originLat: number, originLon: number, destinationsLat: number, destinationsLon: number): Promise<google.maps.DistanceMatrixResponse> {
    this.initMap();
  
    return new Promise((resolve, reject) => {
      const gmd = new google.maps.DistanceMatrixService();
  
      gmd.getDistanceMatrix(
        {
          origins: [{ lat: originLat, lng: originLon }],
          destinations: [{ lat: destinationsLat, lng: destinationsLon }],
          travelMode: google.maps.TravelMode.DRIVING,
        }
      ).then((response) => {
        if (response) {
          resolve(response);
        } else {
          reject(new Error("Error in Distance Matrix API response."));
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  
  
  
  // getDistanceBetweenAddress(originLat: number, originLon: number, destinationsLat: number, destinationsLon: number) {
  //   this.initMap();
  //   const gmd = new google.maps.DistanceMatrixService();
  //   gmd.getDistanceMatrix(
  //     {
  //       origins: [{ lat: originLat, lng: originLon }],
  //       destinations: [{ lat: destinationsLat, lng: destinationsLon }],
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (response, status) => {
  //       if (status === "OK") {
  //         // do whatever with the response
  //         console.log(response);
          
  //       } else {
  //         console.error("Error: " + status);
  //       }
  //     }
  //   ).then((res)=>{
  //     return res;
  //   });
  // }



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
