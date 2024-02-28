import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { sendPasswordResetEmail } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth = inject(FirebaseAuthService);

  email: string = '';
  password: string = '';

  login() {
    console.log(this.email, this.password);

    this.auth.signIn(this.email, this.password)
  }
}
