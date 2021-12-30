import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
