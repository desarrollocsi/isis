import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from '../services';

@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private MS: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        let errorMessage = '';
        if (err instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${err.error.message}`;
        } else {
          errorMessage = `Server-side error: ${err.status} ${err.error.message}`;
        }
        this.MS.MessageError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
