import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NewUser } from '../interfaces/new-user.interface';
import { Auth, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  auth: Auth = inject(Auth);
  userJson: any;

  constructor() {}

  createUser(newUser: NewUser) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.userJson = user.toJSON();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: newUser.name,
    })
      .then(() => {
        const user = auth.currentUser;
        this.userJson = user!.toJSON();
        console.log(this.userJson);

      })
      .catch((error) => {
      });
    }
  }
}
