import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  idmenu: string;
  constructor() {}

  setMenu(data: any) {
    localStorage.setItem('_menu', JSON.stringify(data.Rol[0].menu));
  }

  setUsuario(data: any) {
    localStorage.setItem('_usuario', data.User.username);
  }

  setRol(data: any) {
    localStorage.setItem('_rol', JSON.stringify(data.Rol[0].descripcion));
  }

  setModulos(data: any) {
    localStorage.setItem(`_modulo`, JSON.stringify(data));
  }

  get rol() {
    return localStorage.getItem('_rol');
  }

  get modulos() {
    return JSON.parse(localStorage.getItem('_modulo'));
  }

  get ValidacionUsuario() {
    return localStorage.getItem('_usuario') ? true : false;
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
    return of(menu.filter((menu: any) => menu.padre === parseInt(id)));
  }

  getSubmenu(id: number) {
    const menu = JSON.parse(localStorage.getItem('_menu'));
    return of(menu.filter((menu: any) => menu.padre === id));
  }

  clearLocalstorage() {
    localStorage.clear();
  }
}
