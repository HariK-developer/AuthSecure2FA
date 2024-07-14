import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenExpirationService } from './services/token-expiration.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthSecure2FA';

  constructor(private tokenExpirationService: TokenExpirationService ) {
    
  }

  ngOnInit(): void {
    // Start checking for token expiration
    // You can also check for authentication status here and handle accordingly
    this.tokenExpirationService.startTokenExpirationCheck();
  }

  ngOnDestroy(): void {
    // Stop checking for token expiration when the component is destroyed
    this.tokenExpirationService.stopTokenExpirationCheck();
  }
}
