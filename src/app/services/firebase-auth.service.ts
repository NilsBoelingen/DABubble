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
  sendPasswordResetEmail,
  sendEmailVerification,
  confirmPasswordReset,
  verifyPasswordResetCode,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  auth: Auth = inject(Auth);
  firestore = inject(FirestoreService);

  newUser: NewUser = {
    name: '',
    email: '',
    password: '',
    photoURL: '',
  };

  loginMessage: string = '';

  currentUser: any = '';

  fromPasswords: boolean = false;

  firstName: string = '';
  lastName: string = '';

  emailExists: boolean = false;

  constructor(private router: Router) {}

  updateUserImg(img: string) {
    this.newUser.photoURL = img;
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
        updateProfile(user, {
          displayName: this.newUser.name,
          photoURL: this.newUser.photoURL,
        })
          .then(() => {
            const user = auth.currentUser;
            sendEmailVerification(user!);
            this.getSingleName(user!.displayName);
            this.firestore.addUser(this.newUser, this.firstName, this.lastName);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  getSingleName(fullName: string | undefined | null) {
    let names = fullName!.split(' ');
    this.lastName = names.pop() || '';
    this.firstName = names.join(' ');
  }

  findUser(email: string) {
    return this.firestore.userlist.find((user: any) => user.email === email);
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.currentUser = this.findUser(user.email!);
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
          if (!this.checkEmailMatch(user.email!)) {
            this.getSingleName(user.displayName);
            this.firestore.addUser(user, this.firstName, this.lastName);
          }
          this.currentUser = this.findUser(user.email!);
          console.log(this.currentUser);
          this.loginMessage = 'Login erfolgreich!';
          resolve();
        })
        .catch((error) => {
          this.loginMessage = 'Login nicht möglich!';
          reject(error);
        });
    });
  }

  async signOut() {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.currentUser = '';
          resolve();
        })
        .catch((error: Error) => {
          let errorMessage = error;
          reject(error);
        });
    });
  }

  resetPassword(email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      sendPasswordResetEmail(this.auth, email)
        .then(() => {
          resolve();
        })
        .catch((error: Error) => {
          console.log(error);

          reject(error);
        });
    });
  }

  confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    return confirmPasswordReset(this.auth, code, newPassword);
  }

  checkEmailMatch(emailToCheck: string): boolean {
    for (let i = 0; i < this.firestore.userlist.length; i++) {
      let mail = this.firestore.userlist[i].email;
      if (emailToCheck === mail) {
        return true;
      }
    }
    return false;
  }

  isUserLogin() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.getSingleName(user.displayName);
        this.currentUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: user.email,
          img: user.photoURL,
        };
      } else {
        this.currentUser = undefined;
        this.router.navigateByUrl('/login');
      }
    });
  }
}
