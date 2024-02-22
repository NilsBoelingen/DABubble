import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StartPageComponent } from '../start-page.component';
import { NewUser } from '../../interfaces/new-user.interface';
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

  newUser: NewUser = {
    name: '',
    email: '',
    password: ''
  }

  createNewUser() {
    console.log(this.newUser);

    //[routerLink]="['/choose_avatar']" routerLinkActive="router-link-active"

    this.auth.createUser(this.newUser);
  }
}
