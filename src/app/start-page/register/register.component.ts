import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StartPageComponent } from '../start-page.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, StartPageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  isRunnig: boolean = true;
}
