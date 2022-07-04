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
    localStorage.setItem('_rol', data.Rol[0].nombre);
    this.setIdMedico(data);
  }

  setIdMedico(data: any) {
    if (data.Rol[0].nombre === 'MEDICO') {
      localStorage.setItem('_idmedico', data.User.id_medico);
    }
  }

  setModulos(data: any) {
    localStorage.setItem(`_modulo`, JSON.stringify(data));
  }

  setPersonal(data: any) {
    localStorage.setItem(`_personal`, JSON.stringify(data));
  }

  get personal() {
    return JSON.parse(localStorage.getItem('_personal'));
  }

  get idMedico() {
    return localStorage.getItem('_idmedico');
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

  getMenu({ id }) {
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
