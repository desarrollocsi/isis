import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { especialidades, camas, medicos } from '../db/db';
import { Paciente } from '../models';

import { formDynamic } from '../db/form__dynamic';
import { AuthStorageService } from '../../../core/services';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramaciondesalasService {
  constructor(
    private http: HttpClient,
    private AuthStorageService: AuthStorageService
  ) {}

  /**SUBJECT**/
  private __dataHorarioDeProgramacion = new Subject<any>();
  private __datoDelPaciente = new Subject<any>();
  private __historia = new Subject<any>();
  private __closeSearch = new Subject<boolean>();

  /**BEHAVIORSUBJECT**/
  private data = new BehaviorSubject<any>(null);
  __data = this.data.asObservable();

  private tiempoDeIntervencion = new BehaviorSubject<string>(null);
  __tiempoDeIntervencion$ = this.tiempoDeIntervencion.asObservable();

  private httpDynamic = new BehaviorSubject<{}>(null);
  __httpDynamic$ = this.httpDynamic
    .asObservable()
    .pipe(filter((data: any) => data !== null));

  private dataInformenOperatorio = new BehaviorSubject<string>(null);
  __dataInformenOperatorio$ = this.dataInformenOperatorio
    .asObservable()
    .pipe(filter((data: any) => data !== null));
  /**/

  getDataInformenOperatorio(codigo: string) {
    this.dataInformenOperatorio.next(codigo);
  }

  getDataProgramacion(data: any) {
    this.data.next(data);
  }

  gettiempoDeIntervencion({ tiempo }) {
    this.tiempoDeIntervencion.next(tiempo);
  }

  gethttpDynamic(parametro: {}) {
    return this.httpDynamic.next(parametro);
  }

  get datoDelpaciente() {
    return this.__datoDelPaciente;
  }

  get closeSearch() {
    return this.__closeSearch;
  }

  get dataHorarioDeProgramacion() {
    return this.__dataHorarioDeProgramacion;
  }

  get historia() {
    return this.__historia;
  }

  URL: string = 'http://192.168.10.139:4000';
  // URL:string='http://127.0.0.1:8000'

  getAgendaSoap(fecha: string) {
    return this.http.get(`${this.URL}/agendasoap/${fecha}`);
  }

  getSalas() {
    return this.http.get(`${this.URL}/salas`);
  }

  getEspecialidades() {
    return of(especialidades);
  }

  getCamas() {
    return of(camas);
  }

  getMedicos(codigoDeEspecialidad: string) {
    return of(
      medicos.filter(
        (medicos) => medicos.codigoEspecialidad === codigoDeEspecialidad
      )
    );
  }

  getIntervenciones({ parametro, keys }: { parametro: string; keys: string }) {
    const END_POINT_INTERVENCION = {
      ESPECIALIDAD: this.http.get(`${this.URL}/intervencion/${parametro}/`),
      CODIGO: this.http.get(`${this.URL}/intervencionporcodigo/${parametro}/`),
    };

    return END_POINT_INTERVENCION[keys];
  }

  getAnestesia() {
    return this.http.get(`${this.URL}/anestesia`);
  }

  getParticipantes(codigoIntervencion: string) {
    return this.http.get(`${this.URL}/participantes/${codigoIntervencion}/`);
  }

  getPersonales() {
    if (this.AuthStorageService.personal) {
      return of(this.AuthStorageService.personal);
    }

    return this.http
      .get(`${this.URL}/personales`)
      .pipe(tap((data: any) => this.AuthStorageService.setPersonal(data)));
  }

  getDisponibilidadDeSalas({ fecha, numeroDeSala }) {
    return this.http.get(
      `${this.URL}/disponibilidadsalas/${fecha}/${numeroDeSala}`
    );
  }

  getFormDynamic() {
    return of(formDynamic);
  }

  getProgramacionDeSalas(codigoProgramacion: string) {
    return this.http.get(`${this.URL}/programacion/${codigoProgramacion}/`);
  }

  getProgramacionDeSalasData(codigoProgramacion: string) {
    return this.http.get(`${this.URL}/programacionview/${codigoProgramacion}/`);
  }

  getSearchPaciente(text: string) {
    return this.http
      .get(`${this.URL}/searchpaciente?search=${text}`)
      .pipe(map(this.moldearData));
  }

  getPaciente(numeroDeHistoria: string) {
    return this.http
      .get(`${this.URL}/historia/${numeroDeHistoria}/`)
      .pipe(map((value: any) => new Paciente(value)));
  }

  moldearData(data: any) {
    return data.map((value: any) => new Paciente(value));
  }

  getApiDynamic({ verbo, data }) {
    const END_POINT = {
      PUT: this.http.put(`${this.URL}/programacion/${data.cq_numope}/`, data),
      POST: this.http.post('${this.URL}/programaciones', data),
    };

    return END_POINT[verbo];
  }

  getSearchCie(search: string) {
    return this.http.get(`${this.URL}/searchcie?search=${search}`);
  }

  getReprogramacion(data: any) {
    return this.http.put(
      `${this.URL}/programacionreprogramacion/${data.cq_numope}/`,
      data
    );
  }

  getInformenOperatorio(codigo: string) {
    return this.http.get(`${this.URL}/informeoperatoriodata/${codigo}/`);
  }

  InformeOperatorio(data: any, keys: any) {
    const END_POINT = {
      PUT: this.http.put(
        `${this.URL}/informeoperatoriodata/${data.cq_numope}/`,
        data
      ),
      POST: this.http.post(`${this.URL}/informeoperatorio`, data),
    };

    return END_POINT[keys];
  }
}
