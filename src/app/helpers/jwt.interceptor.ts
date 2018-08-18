import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('JwtInterceptor ');
    // add authorization header with jwt token if available
    const token = localStorage.getItem('token');
    console.log('111111111111 ', token);
    request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
    // if (token) {
    //   console.log('JwtInterceptor in if', token);
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }

    return next.handle(request);
  }
}
