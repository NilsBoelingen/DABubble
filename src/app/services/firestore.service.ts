import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  addUser(email: string, firstName: string, lastName: string) {
    let user = {
      email: email,
      firstName: firstName,
      lastName: lastName
    }
    setDoc(doc(this.firestore, 'userlist'), user)
  }
}
