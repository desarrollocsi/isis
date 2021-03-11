import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AgendamedicaService {
  constructor(private http: HttpClient) {}

  getListadoCitas(fecha: string) {
    const isFecha = fecha === '' ? moment().format('YYYY-MM-DD') : fecha;
    return this.http.get(
      // `http://192.168.10.144:8002/pacientescitados?fecha=${isFecha}&medico=034`
      `http://192.168.10.144:8002/pacientescitados?fecha=2021-02-22&medico=034`
    );
  }
}
