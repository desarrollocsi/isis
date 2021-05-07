import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  URL: string = `${environment.apiUrl}/login/`;

  postLogin(data: any) {
    return this.http.post(this.URL, data);
  }

  // handleError(error:any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
