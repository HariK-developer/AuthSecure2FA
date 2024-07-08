import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SignupComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLogin$: Observable<boolean>;

  constructor(private loginService: LoginService) {
    this.isLogin$ = this.loginService.isLogin$;
  }

  toggleForm() {
    this.loginService.toggleForm();
  }
}
