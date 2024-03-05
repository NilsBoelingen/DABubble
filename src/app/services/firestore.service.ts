import { Injectable, inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, addDoc, collection, onSnapshot, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  userlist: any = [];

  constructor() {
    this.suballUser();
  }

  addUser(newUser: any, firstName: string, lastName: string) {
    let user = {
      email: newUser.email,
      firstName: firstName,
      lastName: lastName,
      img: newUser.photoURL,
    };
    addDoc(collection(this.firestore, 'userlist'), user);
  }

  suballUser() {
    onSnapshot(collection(this.firestore, 'userlist'), (list) => {
      this.userlist = [];
      list.forEach((obj) => {
        let user = obj.data();
        this.userlist.push(user)
      });
    });
  }
}
