import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  auth = inject(FirebaseAuthService);

  resetCode: string = '';
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  loading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetCode = params['oobCode'];
    });
  }

  resetPassword() {
    if (this.newPassword.value === this.confirmPassword.value) {
      this.loading = true;
      this.auth
        .confirmPasswordReset(this.resetCode, this.newPassword.value!)
        .then(() => {
          this.auth.loginMessage = 'Passwort erfolgreich geändert!'
          this.auth.fromPasswords = true;
          this.openDialog();
          setTimeout(() => {
            this.auth.fromPasswords = false;
            this.dialog.closeAll();
            this.loading = false;
            this.router.navigateByUrl('/login');
            this.clearInput();
          }, 2000);
        })
        .catch((error) => {
          this.auth.loginMessage = 'Das hat leider nicht geklappt!'
          this.openDialog();
          setTimeout(() => {
            this.loading = false;
            this.dialog.closeAll();
            this.clearInput();
          }, 2000);
        });
    }
  }

  clearInput() {
    this.newPassword.setValue('');
    this.confirmPassword.setValue('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { headline: `${this.auth.loginMessage}` },
    });
  }

  getNewPWErrorMessage() {
    if (this.newPassword.hasError('minlength')) {
      return 'Mindestlänge 6 Zeichen';
    } else if (this.newPassword.value !== this.confirmPassword.value) {
      return 'Passwörter stimmen nicht überein';
    } else {
      return 'Neues Passwort eingeben';
    }
  }

  getConfPWErrorMessage() {
    if (this.confirmPassword.hasError('minlength')) {
      return 'Mindestlänge 6 Zeichen';
    } else if (this.newPassword.value !== this.confirmPassword.value) {
      return 'Passwörter stimmen nicht überein';
    } else {
      return 'Passwort erneut eingeben';
    }
  }
}
