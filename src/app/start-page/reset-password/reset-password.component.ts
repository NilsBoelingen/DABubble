import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  auth = inject(FirebaseAuthService);

  resetCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
}
