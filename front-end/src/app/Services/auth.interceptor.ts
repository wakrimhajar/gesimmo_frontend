import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
private baseUrl = 'http://localhost:8000/api/auth/login';
  intercept(request: HttpRequest<unknown>, next: HttpHandler):
  Observable<HttpEvent<unknown>> {
    
    if(request.url !== 'http://localhost:8000/api/auth/login')
    {
      const token =localStorage.getItem('token');
      request=request.clone({
        setHeaders:{
          Authorization:'Bearer'+token
        }
      });
    }
    return next.handle(request);
  }
}
