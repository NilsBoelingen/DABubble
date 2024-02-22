import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NewUser } from '../interfaces/new-user.interface';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  auth: Auth = inject(Auth);


  constructor() { }

  createUser(newUser: NewUser) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
