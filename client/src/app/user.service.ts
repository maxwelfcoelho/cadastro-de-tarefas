import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  register(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }

  login(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      email: user.email,
      password: user.password
    });
  }

  getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
