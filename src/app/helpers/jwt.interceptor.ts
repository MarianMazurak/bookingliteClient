import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  ingoreRoutes = ['/api/login', '/api/register'];
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (!(this.ingoreRoutes.includes(request.url))) {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('token');
    console.log('Used token', token);
    request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
  }
    return next.handle(request);
  }
}
