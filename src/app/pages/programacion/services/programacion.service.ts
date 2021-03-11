import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IntermedaryService } from '../../../core/services/intermedary.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ProgramacionService {
  constructor(private http: HttpClient, private IS: IntermedaryService) {}

  getProgramacionlist(fecha: string) {
    const isFecha = fecha === '' ? moment().format('YYYY-MM-DD') : fecha;

    return this.http.get(
      `http://192.168.10.144:8002/admision/citas/programacionesfecha?fecha=${isFecha}`
    );
  }

  getProgramacionShow(id: string) {
    return this.http.get(`http://192.168.10.144:8002/programaciones/${id}`);
  }

  getProgramacionDelete(id: string) {
    return this.http.delete(`http://192.168.10.144:8002/programaciones/${id}`);
  }

  postProgramacion(data: any) {
    return this.http
      .post('http://192.168.10.144:8002/programaciones', data)
      .pipe(tap(() => this.IS.refresh.next()));
  }

  putProgramacion(data: any) {
    return of(data);
  }

  apiDinamic(data: any, type: string = 'POST') {
    switch (type) {
      case 'POST': {
        return this.http
          .post('http://192.168.10.144:8002/programaciones', data)
          .pipe(tap(() => this.IS.refresh.next()));
      }
      case 'PUT': {
        return this.http
          .put(
            `http://192.168.10.144:8002/programaciones/${data.pr_numero}`,
            data
          )
          .pipe(tap(() => this.IS.refresh.next()));
      }
    }
    return of({ data, type });
  }
}
