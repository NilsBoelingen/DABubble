import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [LoginComponent, MatCardModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

}
