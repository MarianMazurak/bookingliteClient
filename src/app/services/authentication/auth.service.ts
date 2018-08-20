import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterUser} from '../../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;

  constructor(private http: HttpClient) { }

  signIn(model: RegisterUser): Observable<any> {
    console.log('In auth service');
    console.log('json', JSON.stringify({email: model.email, password: model.password}));
    return this.http.post('/api/login', JSON.stringify({email: model.email, password: model.password}),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      }  );
  }

  saveToken(token: string) {
    console.log('save token', token);
    localStorage.setItem('token', token);
  }

  getToken(): string {
    console.log('in get token');
    return localStorage.getItem('token');
  }

  signOut(): boolean {
    localStorage.clear();
    return this.authenticated = false;
  }

  get isAuthenticated() {
    return this.authenticated;
  }

  set isAuthenticated(val: boolean) {
    this.authenticated = val ;
  }

}
