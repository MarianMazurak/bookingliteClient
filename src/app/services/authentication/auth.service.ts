import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginDto} from '../../models/loginDto';
import { Router } from '@angular/router';
import { RegisterDto } from '../../models/registerDto';
import { User } from '../../models/user';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser: User;
  private _isOwner: boolean;
  constructor(private http: HttpClient, private router: Router) {
  }

  signIn(model: LoginDto): Observable<any> {
    return this.http.post('/api/login', JSON.stringify({email: model.email, password: model.password}),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      });
  }

  signUp(model: RegisterDto): Observable<any> {
    return this.http.post('/api/register', JSON.stringify(model),
      {headers: new HttpHeaders({
          'Content-Type':  'application/json' }),
        responseType: 'text'
      });
  }
  loadUser(): Observable<User> {
    return this.http.get<User>('/api/user').pipe(tap( user => {
        this._currentUser = user;
        const ownerrole = this._currentUser.roles.find(role => role.name === 'ROLE_OWNER');
        if (ownerrole) {
          this._isOwner = true;
        }
    }));
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  signOut(): void {
    localStorage.removeItem('token');
    this._currentUser = undefined;
    this._isOwner = false;
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
     return localStorage.getItem('token') != null;
  }

  get isOwner(): Observable<boolean> {
    return Observable.create( observer => {
      if (this._currentUser !== undefined) {
        observer.next(this._isOwner);
        observer.complete();
      } else {
        this.loadUser().subscribe( res => {
          observer.next(this._isOwner);
          observer.complete();
        });
      }
    });
  }

  get currentUser(): Observable<User> {
    return Observable.create( observer => {
      if (this._currentUser !== undefined) {
        observer.next(this._currentUser);
      } else {
        this.loadUser().subscribe( res => {
          observer.next(res);
        });
      }
    });
  }
  getUserFromBackEnd(): Observable<User> {
    return this.http.get<User>('/api/user');
  }
}
