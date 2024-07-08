import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Login } from '../interface/login';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  passwordVisible$: Observable<boolean>;

  applyForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  data: Login = {
    username: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private apiService: ApiService
  ) {
    this.passwordVisible$ = this.loginService.passwordVisible$;
  }

  get username() {
    return this.applyForm.get('username');
  }

  get password() {
    return this.applyForm.get('password');
  }

  toggleForm() {
    this.loginService.toggleForm();
  }

  PasswordVisibility() {
    this.loginService.hideShowPassword();
  }

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  }

  Signup() {
    if (this.applyForm.invalid) {
      // Display validation errors
      this.applyForm.markAllAsTouched();
      return;
    }

    // Bind form data to the `data` object before making the API call
    this.data.username = this.username?.value || '';
    this.data.password = this.password?.value || '';

    this.apiService.signup(this.data).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error: any) => {
        console.error('Error posting data', error);
      },
      complete: () => {
        console.log('Signup request completed.');
      },
    });
  }
}
