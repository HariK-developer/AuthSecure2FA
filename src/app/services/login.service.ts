import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoginSubject = new BehaviorSubject<boolean>(true);
  private isPasswordSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();
  passwordVisible$ = this.isPasswordSubject.asObservable();
  private readonly TOKEN_KEY = 'access_token';
  
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  toggleForm() {
    this.isLoginSubject.next(!this.isLoginSubject.value);
  }

  hideShowPassword() {
    this.isPasswordSubject.next(!this.isPasswordSubject.value);
  }

  
 getTokenExpirationDate(token: string): Date | null {
  const decoded: any = jwtDecode(token);
  if (!decoded || decoded.exp === undefined) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

isTokenExpired(token?: string): boolean {
  if (!token) token = this.getToken() || undefined; // Ensure token is either string or undefined
  if (!token) return true;
  const date = this.getTokenExpirationDate(token);
  if (date === null) return true;
  return date.valueOf() <= new Date().valueOf();
}
}



