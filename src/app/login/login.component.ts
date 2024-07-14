import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ApiService } from '../services/api.service';
import { HandleErrorService } from '../services/handle-error.service';
import { Login } from '../interface/login';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  showValidationMessage = false;
  otpRequired = false;
  qrCodeUrl: string = '';

  applyForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    password: new FormControl('', Validators.required),
    otp: new FormControl(''),
  });

  data: Login = {
    username: '',
    password: '',
    otp: '',
  };
  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private errorService: HandleErrorService,
    private router: Router
  ) {
    this.isLogin$ = this.loginService.isLogin$;
  }

  get username() {
    return this.applyForm.get('username');
  }

  get password() {
    return this.applyForm.get('password');
  }

  get otp() {
    return this.applyForm.get('otp');
  }

  toggleForm() {
    this.applyForm.reset();
    this.loginService.toggleForm();
  }

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  }

  Login() {
    if (this.applyForm.invalid) {
      // Display validation errors
      this.applyForm.markAllAsTouched();
      this.showValidationMessage = true;
      setTimeout(() => {
        this.showValidationMessage = false;
      }, 3000);
      return;
    }

    // Bind form data to the `data` object before making the API call
    this.data.username = this.username?.value || '';
    this.data.password = this.password?.value || '';
    this.data.otp = this.otp?.value || '';

    this.apiService.login(this.data).subscribe({
      next: (response) => {
        // Reset form

        this.applyForm.reset();
        if (response.qr_code_url) {
          this.qrCodeUrl = response.qr_code_url;
        } else {
          this.loginService.setToken(response.access_token); // set the access token
          this.router.navigate(['/home']);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.detail.otp) {
          this.otpRequired = error.error.detail.otp;
        } else {
          // Reset form
          this.errorService.handleError(error);
          this.applyForm.reset();
        }
      },
      complete: () => {
        // Reset form
        this.applyForm.reset();
      },
    });
  }
}
