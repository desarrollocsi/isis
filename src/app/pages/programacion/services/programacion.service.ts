import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IntermedaryService } from '../../../core/services';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramacionService {
  constructor(private http: HttpClient, private IS: IntermedaryService) {}

  getProgramacionlist(fecha: string) {
    const isFecha = fecha === '' ? moment().format('YYYY-MM-DD') : fecha;
    return this.http.get(
      `${environment.apiUrl}/admision/citas/programacionesfecha?fecha=${isFecha}`
    );
  }

  getProgramacionShow(id: string) {
    return this.http.get(`${environment.apiUrl}/programaciones/${id}`);
  }

  getProgramacionDelete(id: string) {
    return this.http.delete(`${environment.apiUrl}/programaciones/${id}`);
  }

  apiDinamic(data: any, type: string = 'POST') {
    switch (type) {
      case 'POST': {
        return this.http
          .post(`${environment.apiUrl}/programaciones`, data)
          .pipe(tap(() => this.IS.refresh.next()));
      }
      case 'PUT': {
        return this.http
          .put(`${environment.apiUrl}/programaciones/${data.pr_numero}`, data)
          .pipe(tap(() => this.IS.refresh.next()));
      }
    }
    return of({ data, type });
  }

  /****************SUBJECT*****************/
  private dataProgramacion = new Subject<any>();
  _dataProgramacion = this.dataProgramacion.asObservable();

  private verbhttp = new Subject<any>();
  _verbhttp = this.verbhttp.asObservable();

  getDataProgramacion(data: any) {
    this.dataProgramacion.next(data);
  }

  getVerbHttp(verb: string) {
    this.verbhttp.next(verb);
  }
}
