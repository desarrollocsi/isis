import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntermedaryService {
  constructor() {}

  private _refresh = new Subject<void>();

  private menus = new BehaviorSubject<any>([]);
  _menus = this.menus.asObservable();

  private programacion = new BehaviorSubject<any>([]);
  dataProgramacion = this.programacion.asObservable();

  private datoDePaciente = new BehaviorSubject<any>([]);
  _datoDePaciente = this.datoDePaciente.asObservable();

  private fecha = new BehaviorSubject<string>('');
  _fecha = this.fecha.asObservable();

  private route = new BehaviorSubject<string>('');
  _route = this.route.asObservable();

  private dataDynamic = new BehaviorSubject<string>('');
  _dataDynamic = this.dataDynamic.asObservable();

  private modal = new BehaviorSubject<boolean>(false);
  _modal = this.modal.asObservable();

  getModal(status: boolean) {
    this.modal.next(status);
  }

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

  getRoute(route: any) {
    this.route.next(route);
  }

  getDataDynamic(id: string) {
    this.dataDynamic.next(id);
  }

  get refresh() {
    return this._refresh;
  }
}
