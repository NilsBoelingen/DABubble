import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NewUser } from '../interfaces/new-user.interface';
import {
  Auth,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';

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
  };

  constructor() {}

  updateUserImg(img: string) {
    this.newUser.img = img;
  }

  createUser() {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      this.newUser.email,
      this.newUser.password
    )
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
        .catch((error) => {});
    }
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.toJSON());

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
