import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private loginService: LoginService,
    private router: Router
  ) {}


  logout(){
    this.loginService.removeToken();
    this.router.navigate(['']);
  }
}
