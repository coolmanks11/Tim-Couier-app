import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, 
  deleteDoc, 
  updateDoc } from '@angular/fire/firestore';
  import {User} from '../DTO/User'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth,private firestore: Firestore) { }
  async register(email:string, password:string,firstname:string, lastname:string) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
      const userdetails: User = {
        lastname: lastname,
        firstname: firstname,
        id: user?.user.uid,
        email: email
      };
      const userRef = collection(this.firestore, 'Users');

      addDoc(userRef,userdetails)
			return user;
		} catch (e) {
			return null;
		}
		
	}

	async login( email:string, password:string ) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
      
			return null;
		}
	}

	logout() {
		console.log("auth service "+this.auth)
		return signOut(this.auth);
	}
	
}