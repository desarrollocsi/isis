import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntermedaryService {
  constructor() {}

  private _refresh = new Subject<void>();

  private menus = new BehaviorSubject<any>([]);
  dataMenu = this.menus.asObservable();

  private programacion = new BehaviorSubject<any>([]);
  dataProgramacion = this.programacion.asObservable();

  private datoDePaciente = new BehaviorSubject<any>([]);
  _datoDePaciente = this.datoDePaciente.asObservable();

  private fecha = new BehaviorSubject<string>('');
  _fecha = this.fecha.asObservable();

  private route = new BehaviorSubject<string>('');
  _route = this.route.asObservable();

  getMenus(data: any) {
    this.menus.next(data);
  }

  getEdit(data: any) {
    this.programacion.next(data);
  }
  getDatoDePaciente(data: any) {
    this.datoDePaciente.next(data);
  }

  getFecha(fecha: string) {
    this.fecha.next(fecha);
  }

  getRoute(route: string) {
    this.route.next(route);
  }

  get refresh() {
    return this._refresh;
  }
}
