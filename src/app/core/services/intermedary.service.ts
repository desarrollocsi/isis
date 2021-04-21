import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntermedaryService {
  constructor() {}

  private _refresh = new Subject<void>();
  private _modal = new Subject<void>();
  private _methodPost = new Subject<string>();
  private _methodPut = new Subject<string>();

  private idDataEdit = new Subject<object>();
  _idDataEdit = this.idDataEdit.asObservable();

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

  getDataId(id: object) {
    this.idDataEdit.next(id);
  }

  /*********** GET*****************/

  get refresh() {
    return this._refresh;
  }

  get modal() {
    return this._modal;
  }

  get methodPost() {
    return this._methodPost;
  }

  get methodPut() {
    return this._methodPut;
  }
}
