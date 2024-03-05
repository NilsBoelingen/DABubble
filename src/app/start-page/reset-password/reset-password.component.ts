import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  auth = inject(FirebaseAuthService);

  resetCode: string = '';
  newPassword = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetCode = params['oobCode'];
    });
  }

  resetPassword() {
    if (this.newPassword.value === this.confirmPassword.value) {
      this.auth.confirmPasswordReset(this.resetCode, this.newPassword.value!)
      .then(() => {
        console.log('erfolg');
      })
      .catch((error) => {
        console.log('das hat nicht geklappt');
      });
    }
  }
}
