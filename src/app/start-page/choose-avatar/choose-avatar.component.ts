import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { FirebaseSorageService } from '../../services/firebase-sorage.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  headline: string;
}

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    DialogComponent,
  ],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss',
})
export class ChooseAvatarComponent {
  auth = inject(FirebaseAuthService);
  storage = inject(FirebaseSorageService);

  avatars = [
    'assets/img/start_page/avatar_1.png',
    'assets/img/start_page/avatar_2.png',
    'assets/img/start_page/avatar_3.png',
    'assets/img/start_page/avatar_4.png',
    'assets/img/start_page/avatar_5.png',
    'assets/img/start_page/avatar_6.png',
  ];

  currentAvatar = 'assets/img/start_page/avatar_default.png';
  selectedFile?: File;

  loading: boolean = false;

  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef =
    {} as ElementRef;

  constructor(private router: Router, public dialog: MatDialog) {}

  chooseFile() {
    this.fileInputRef.nativeElement.click();
  }

  onFileChange(event: Event) {
    this.loading = true;
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.currentAvatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.loading = false;
  }

  async updateUser() {
    this.loading = true;
    this.openDialog();
    if (this.selectedFile) {
      try {
        await this.storage.uploadCustomAvatar(this.selectedFile);
        this.currentAvatar = this.storage.avatarURL;
        this.auth.updateUserImg(this.currentAvatar);
        this.auth.createUser();
        this.loading = false;
        this.router.navigateByUrl('/login');
        this.dialog.closeAll();
      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      this.auth.updateUserImg(this.currentAvatar);
      this.auth.createUser();
      this.loading = false;
      this.router.navigateByUrl('/login');
      this.dialog.closeAll();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {headline: 'Konto erfolgreich erstellt!'},
    });
  }
}
