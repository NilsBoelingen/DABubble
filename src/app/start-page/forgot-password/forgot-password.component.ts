import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  auth = inject(FirebaseAuthService);

  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
  ]);

  loading: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Bitte Email-adresse eingeben!';
    }
    return this.email.hasError('pattern') ? 'Email-adresse nicht korrekt!' : '';
  }

  sendMail() {
    if (this.email.valid) {
      this.loading = true;
      this.auth
        .resetPassword(this.email.value!)
        .then(() => {
          this.auth.fromPasswords = true;
          this.openDialog()
          console.log('Email zum Zurücksetzen gesendet');
          setTimeout(() => {
            this.auth.fromPasswords = false;
            this.dialog.closeAll();
            this.loading = false;
            this.router.navigateByUrl('/login');
          }, 2000);
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            alert('Nutzer nicht gefunden')
          }
          // Fehler beim Senden der Email
          console.error('Fehler beim Senden der Email:', error);
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { headline: `E-Mail gesendet` },
    });
  }
}
