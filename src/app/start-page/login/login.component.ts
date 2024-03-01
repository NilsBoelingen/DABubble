import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    MatProgressBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth = inject(FirebaseAuthService);

  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
  ]);
  password = new FormControl('', [Validators.required]);

  loading: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) {}

  login() {
    this.loading = true;
    this.openDialog();
    this.auth.signIn(this.email.value!, this.password.value!);
    this.redirect();
  }

  async loginWhitGoogle() {
    this.loading = true;
    await this.auth.signInWithGoogle()
    .then(() => {
      this.openDialog();
      this.redirect();
    });
  }

  redirect() {
    if (this.auth.currentUser) {
      setTimeout(() => {
        this.loading = false;
        this.dialog.closeAll();
        this.router.navigateByUrl('/main');
      }, 2000);
    } else {
      setTimeout(() => {
        this.loading = false;
        this.dialog.closeAll();
      }, 2000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { headline: this.auth.loginMessage },
    });
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Bitte Email-adresse eingeben!';
    }
    return this.email.hasError('pattern') ? 'Email-adresse nicht korrekt!' : '';
  }
}
