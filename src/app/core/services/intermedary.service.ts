import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IntermedaryService {
  constructor(private AUS: AuthStorageService) {}

  private _refresh = new Subject<void>();
  private _modal = new Subject<void>();
  private _methodPost = new Subject<string>();
  private _methodPut = new Subject<string>();

  private idDataEdit = new Subject<object>();
  _idDataEdit = this.idDataEdit.asObservable();

  private dataActoMedico = new Subject<any>();
  _dataActoMedico = this.dataActoMedico.asObservable();

  private menus = new BehaviorSubject<any>(this.AUS.modulos || null);
  _menus = this.menus.asObservable().pipe(
    tap(console.log),
    filter((data: any) => data !== null)
  );

  private programacion = new BehaviorSubject<any>([]);
  dataProgramacion = this.programacion.asObservable();

  private datoDePaciente = new BehaviorSubject<any>(null);
  _datoDePaciente = this.datoDePaciente
    .asObservable()
    .pipe(filter((data: any) => data !== null));

  private fecha = new BehaviorSubject<string>(null);
  _fecha = this.fecha.asObservable().pipe(filter((data: any) => data !== null));

  private route = new BehaviorSubject<string>('');
  _route = this.route.asObservable();

  private dataDynamic = new BehaviorSubject<string>('');
  _dataDynamic = this.dataDynamic.asObservable();

  private dataDeProgramacionDeSalas = new Subject<any>();
  _dataDeProgramacionDeSalas = this.dataDeProgramacionDeSalas
    .asObservable()
    .pipe(filter((data: any) => data !== null));

  getCodigoProgramacion(dataDeProgramacionDeSalas: any) {
    this.dataDeProgramacionDeSalas.next(dataDeProgramacionDeSalas);
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

  getDataId(id: object) {
    this.idDataEdit.next(id);
  }

  getDataActoMedico(id: any) {
    this.dataActoMedico.next(id);
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
