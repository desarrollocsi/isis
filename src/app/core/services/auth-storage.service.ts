import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { IntermedaryService } from './intermedary.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  idmenu: string;
  constructor(private IS: IntermedaryService) {}

  setMenu(data: any) {
    localStorage.setItem('_menu', JSON.stringify(data.Rol[0].menu));
  }

  setUsuario(data: any) {
    localStorage.setItem('_usuario', data.User.username);
  }

  setRol(data: any) {
    localStorage.setItem('_rol', JSON.stringify(data.Rol[0].nombre));
  }

  setModulos(data: any) {
    localStorage.setItem(`_${data.nombres}`, data.id);
  }

  get User() {
    return localStorage.getItem('_usuario');
  }

  getModulos() {
    const menu = JSON.parse(localStorage.getItem('_menu'));
    return of(menu.filter((menu: any) => menu.nivel === 0));
  }

  isValidacionMenus(nombre: string) {
    return localStorage.getItem(`_${nombre}`) ? true : false;
  }

  getMenu(data: any) {
    const { id } = data;
    const menu = JSON.parse(localStorage.getItem('_menu'));
    // return of(menu.filter((menu: any) => menu.padre === parseInt(id)));
    return of(menu.filter((menu: any) => menu.padre === parseInt('1')));
  }

  getSubmenu(id: number) {
    const menu = JSON.parse(localStorage.getItem('_menu'));
    return of(menu.filter((menu: any) => menu.padre === id));
  }
}
