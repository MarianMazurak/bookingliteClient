import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/authentication/auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  ingoreRoutes = ['/api/login', '/api/register'];
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!(this.ingoreRoutes.includes(request.url))) {
    const token = localStorage.getItem('token');
    if (token != null) {
    console.log('Call route', request.url);
    console.log('Used token', token);
    request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    }
  }
  return next.handle(request).pipe( tap( (ev: HttpEvent<any>) => {
      if (ev instanceof HttpResponse) {

      }
  }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.signOut();
        }
      }
  }));
  }
}
