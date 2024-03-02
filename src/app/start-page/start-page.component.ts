import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [LoginComponent, MatCardModule, RouterModule, CommonModule, RegisterComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {

  constructor(public router: Router) {}

}
