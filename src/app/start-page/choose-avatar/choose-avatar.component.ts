import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent {

  avatars = [
    'assets/img/start_page/avatar_1.png',
    'assets/img/start_page/avatar_2.png',
    'assets/img/start_page/avatar_3.png',
    'assets/img/start_page/avatar_4.png',
    'assets/img/start_page/avatar_5.png',
    'assets/img/start_page/avatar_6.png',
  ];

  currentAvatar = '';
}
