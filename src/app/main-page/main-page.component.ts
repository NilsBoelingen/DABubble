import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { WorkspaceContentComponent } from './workspace-content/workspace-content.component';
import { CommonModule } from '@angular/common';
import { MainChatContentComponent } from './main-chat-content/main-chat-content.component';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, MatSidenavModule, MatCardModule, WorkspaceContentComponent, CommonModule, MainChatContentComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  auth = inject(FirebaseAuthService);

  matCardWidth = 'calc(100% - 386px - 40px)';
  workspaceOpen = true;

  constructor(private router: Router) {}

  switchWorkspace() {
    if (this.workspaceOpen) {
      this.workspaceOpen = false;
      this.matCardWidth = 'calc(100% - 40px)';
    } else {
      this.workspaceOpen = true;
      this.matCardWidth = 'calc(100% - 386px - 40px)';
    }
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/')
  }
}
