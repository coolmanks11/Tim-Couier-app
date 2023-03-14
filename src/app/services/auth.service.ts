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
	updateDoc,
	query,
	where,
	getDocs
} from '@angular/fire/firestore';
import { User } from '../DTO/User'
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private auth: Auth, private firestore: Firestore) { }
	async register(email: string, password: string, firstname: string, lastname: string) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			const userdetails: User = {
				lastname: lastname,
				firstname: firstname,
				id: user?.user.uid,
				email: email
			};
			const userRef = collection(this.firestore, 'Users');

			addDoc(userRef, userdetails)
			return user;
		} catch (e) {
			return null;
		}

	}

	async login(email: string, password: string) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			//check user exist in user collect or not 
			const usersRef = collection(this.firestore, 'Users');
			const userQuery = query(usersRef, where('id', '==', user.user.uid));
			const querySnapshot = await getDocs(userQuery);

			if (querySnapshot.empty) {
				return null;
			}
			const userData = querySnapshot.docs[0].data() as User;
			console.log(userData.firstname);
			return user;
		} catch (e) {
			console.log(e);
			return null;
		}
	}


	logout() {
		console.log("auth service " + this.auth)
		return signOut(this.auth);
	}
	getCurrentUser() {
		console.log(this.auth.currentUser);

		return this.auth.currentUser;
	}
}