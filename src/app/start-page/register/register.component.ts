import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { StartPageComponent } from '../start-page.component';
import { FormsModule } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, StartPageComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  auth = inject(FirebaseAuthService);

  isRunnig: boolean = true;

  name:string = '';
  email:string = '';
  password:string = '';

  constructor(private router: Router) {}

  updateUser() {
    this.auth.updateUserInfo(this.name, this.email, this.password);
    this.router.navigateByUrl('/choose_avatar');
  }
}
