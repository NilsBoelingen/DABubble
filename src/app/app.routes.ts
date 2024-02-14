import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './start-page/login/login.component';
import { RegisterComponent } from './start-page/register/register.component';
import { ChooseAvatarComponent } from './start-page/choose-avatar/choose-avatar.component';

export const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'choose_avatar', component: ChooseAvatarComponent}
    ],
  },
  { path: 'main', component: MainPageComponent },
];
