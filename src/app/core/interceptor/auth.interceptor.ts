import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthStorageService } from '../services/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private AUS: AuthStorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const token = this.AUS.getToken();
    // if (!token) {
    //   return next.handle(req);
    // }

    const headers = req.clone({
      setHeaders: {
        Accept: 'application/json',
        //Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(headers);
  }
}
