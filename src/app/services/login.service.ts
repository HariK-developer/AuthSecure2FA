import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLoginSubject = new BehaviorSubject<boolean>(true);
  private isPasswordSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();
  passwordVisible$ = this.isPasswordSubject.asObservable();

  toggleForm() {
    this.isLoginSubject.next(!this.isLoginSubject.value);
  }

  hideShowPassword() {
    this.isPasswordSubject.next(!this.isPasswordSubject.value);
  }
}
