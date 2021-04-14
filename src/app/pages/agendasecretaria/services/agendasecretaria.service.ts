import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProgramacionAgenda } from '../../../core/models/programacion-agenda.class';

import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgendasecretariaService {
  constructor(private http: HttpClient) {}

  getEspecialidades(fecha: string) {
    const isFecha = fecha === '' ? moment().format('YYYY-MM-DD') : fecha;
    return this.http
      .get(
        `http://192.168.10.144:8002/admision/citas/programacionesfecha?fecha=${isFecha}`
      )
      .pipe(
        map((data: any) =>
          data.map((data: any) => new ProgramacionAgenda(data))
        )
      );
  }

  getMedico(id: string) {
    return this.http.get(
      `http://192.168.10.144:8002/medicosespecialidad?especialidad=${id}`
    );
  }
}
