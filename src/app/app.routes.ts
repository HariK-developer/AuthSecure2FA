import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
