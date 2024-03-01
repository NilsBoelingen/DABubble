import { Injectable, inject } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { NewUser } from '../interfaces/new-user.interface';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
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

  loginMessage: string = '';

  currentUser: any = '';

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
        this.currentUser = user.toJSON();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
      });
  }

  signInWhitGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        this.currentUser = user.toJSON();
        console.log(this.currentUser.displayName);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
