import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {

  private readonly CHECK_INTERVAL = 60000; // 1 minute
  private intervalSubscription: Subscription | undefined;

  constructor(private authService: LoginService,
    private router: Router
  ) {
    this.startTokenExpirationCheck();
  }

   startTokenExpirationCheck(): void {
    this.intervalSubscription = interval(this.CHECK_INTERVAL)
      .subscribe(() => {
        if (this.authService.isTokenExpired()) {
          this.authService.removeToken();
          this.router.navigate(['']);
          this.intervalSubscription?.unsubscribe();
        }
      });
  }

  stopTokenExpirationCheck(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

}
