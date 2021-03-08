import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  setMenu(data: any) {
    localStorage.setItem('_menu', JSON.stringify(data.menu));
  }

  getMenu(id: number) {
    const menu = JSON.parse(localStorage.getItem('_menu'));

    return of(menu.filter((menu: any) => menu.padre === id));
  }
}
