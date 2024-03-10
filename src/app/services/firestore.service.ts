import { Injectable, inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, addDoc, collection, onSnapshot, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  userlist: any = [];
  channellist: any = [];

  constructor() {
    this.suballUser();
    this.subAllChannels();
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

  async suballUser() {
    onSnapshot(collection(this.firestore, 'userlist'), (list) => {
      this.userlist = [];
      list.forEach((obj) => {
        let user = obj.data();
        this.userlist.push(user)
      });
    });
  }

  subAllChannels() {
    onSnapshot(collection(this.firestore, 'channels'), (list) => {
      this.channellist = [];
      list.forEach((obj) => {
        let channel = obj.data();
        this.channellist.push(channel);
      });
    });
  }
}
