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

  getMenus(data: any) {
    this.menus.next(data);
  }

  getEdit(data: any) {
    this.programacion.next(data);
  }
  getDatoDePaciente(data: any) {
    this.datoDePaciente.next(data);
  }

  get refresh() {
    return this._refresh;
  }
}
