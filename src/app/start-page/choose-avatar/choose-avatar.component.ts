import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent {
  auth = inject(FirebaseAuthService);

  avatars = [
    'assets/img/start_page/avatar_1.png',
    'assets/img/start_page/avatar_2.png',
    'assets/img/start_page/avatar_3.png',
    'assets/img/start_page/avatar_4.png',
    'assets/img/start_page/avatar_5.png',
    'assets/img/start_page/avatar_6.png',
  ];

  currentAvatar = '';

  constructor(private router: Router) {}

  updateUser() {
    this.auth.updateUserImg(this.currentAvatar);
    this.auth.createUser();
  }
}
