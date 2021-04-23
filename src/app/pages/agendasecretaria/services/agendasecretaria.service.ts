import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

import { ProgramacionAgenda } from '../../../core/models/programacion-agenda.class';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendasecretariaService {
  constructor(private http: HttpClient) {}

  getEspecialidades(fecha: string) {
    return this.http
      .get(`${environment.apiUrl}/especialidadesprogramacion?fecha=${fecha}`)
      .pipe(
        map((data: any) =>
          data.map((data: any) => new ProgramacionAgenda(data))
        )
      );
  }

  getMedico(data: any) {
    const { fecha, especialidad } = data;
    return this.http.get(
      `${environment.apiUrl}/medicosprogramacion?fecha=${fecha}&especialidad=${especialidad}`
    );
  }

  getAgenMedica(data: any) {
    const { pr_numero } = data;
    return this.http.get(
      `${environment.apiUrl}/agendamedica?programacion=${pr_numero}`
    );
  }

  /**************INTERMEDIARIO-SUBJECT**************/

  _modal = new Subject<void>();

  private idProgramacion = new BehaviorSubject<any>(null);
  _idProgramacion = this.idProgramacion
    .asObservable()
    .pipe(filter((data) => data !== null));

  private dataProgramacion = new BehaviorSubject<any>(null);
  _dataProgramacion = this.dataProgramacion
    .asObservable()
    .pipe(filter((data) => data !== null));

  getIdProgramacion(id: string) {
    this.idProgramacion.next(id);
  }

  getDataProgramacion(data: any) {
    this.dataProgramacion.next(data);
  }

  get openModal() {
    return this._modal;
  }
}
