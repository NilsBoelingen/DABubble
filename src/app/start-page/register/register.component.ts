import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { StartPageComponent } from '../start-page.component';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, StartPageComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  auth = inject(FirebaseAuthService);

  isRunnig: boolean = true;

  nameForm = new FormControl('', [Validators.required, Validators.minLength(3)]);
  emailForm = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")]);
  passwordForm = new FormControl('', [Validators.required]);
  checkboxForm = new FormControl('', [Validators.required]);

  constructor(private router: Router) {}

  updateUser() {
    this.router.navigateByUrl('/choose_avatar');
  }
}
