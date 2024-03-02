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
  signOut,
  updateProfile,
  connectAuthEmulator,
  sendPasswordResetEmail,
  confirmPasswordReset,
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

  fromPasswords: boolean = false;

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
        this.loginMessage = 'Login erfolgreich!';
      })
      .catch((error) => {
        this.loginMessage = 'Email oder Passwort falsch!';
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
      });
  }

  async signInWithGoogle() {
    return new Promise<void>((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          const user = result.user;
          this.currentUser = user.toJSON();
          console.log(this.currentUser.displayName);
          this.loginMessage = 'Login erfolgreich!';
          resolve(); // Aufrufen der resolve-Funktion, um anzuzeigen, dass der Vorgang abgeschlossen ist
        })
        .catch((error) => {
          // Fehlerbehandlung
          this.loginMessage = 'Login nicht möglich!';
          reject(error); // Aufrufen der reject-Funktion, um anzuzeigen, dass ein Fehler aufgetreten ist
        });
    });
  }

  async signOut() {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.currentUser = '';
          // Sign-out successful.
          resolve();
        })
        .catch((error: Error) => {
          let errorMessage = error;
          // An error happened.
          reject(error);
        });
    });
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
  }
}
