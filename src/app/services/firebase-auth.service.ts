import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NewUser } from '../interfaces/new-user.interface';
import { Auth, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  auth: Auth = inject(Auth);

  newUser: NewUser = {
    name: '',
    email: '',
    password: '',
    img: '',
  }

  constructor() {}

  updateUserInfo(name: string, email: string, password: string) {
    this.newUser.name = name;
    this.newUser.email = email;
    this.newUser.password = password;
  }

  updateUserImg(img: string) {
    this.newUser.img = img;
  }

  createUser() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.newUser.email, this.newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: this.newUser.name,
      photoURL: this.newUser.img,
    })
      .then(() => {
        const user = auth.currentUser;
      })
      .catch((error) => {
      });
    }
  }
}
