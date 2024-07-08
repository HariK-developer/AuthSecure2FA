import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = ' http://127.0.0.1:8000';  

  constructor(private http: HttpClient) { }

  signup(data: Login): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/signup`, data, { headers });
  }
}
