import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  setMenu(data: any) {
    localStorage.setItem('_menu', JSON.stringify(data));
  }

  getMenu() {
    return JSON.parse(localStorage.getItem('_menu'));
  }
}
