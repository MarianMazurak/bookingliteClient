import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginDto} from '../../models/loginDto';
import { Router } from '@angular/router';
import { RegisterDto } from '../../models/registerDto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  signIn(model: LoginDto): Observable<any> {
    console.log('In auth service');
    console.log('json', JSON.stringify(model));
    return this.http.post('/api/login', JSON.stringify({email: model.email, password: model.password}),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      }  );
  }

  signUp(model: RegisterDto): Observable<any> {
    console.log('json', JSON.stringify(model));
    return this.http.post('/api/login', JSON.stringify(model),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      }  );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authenticated = false;
  }

  get isAuthenticated() {
    return this.authenticated;
  }

  set isAuthenticated(val: boolean) {
    this.authenticated = val;
  }
}
