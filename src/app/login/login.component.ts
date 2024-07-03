import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [NgOptimizedImage, SignupComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
