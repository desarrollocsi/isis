import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get('http://192.168.10.144:8001/menus/');
  }
}
