import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AgendamedicaService {
  constructor(private http: HttpClient) {}

  getListadoCitas(fecha: string) {
    const isFecha = fecha ? fecha : moment().format('YYYY-MM-DD');
    return this.http.get(
      `${environment.apiUrl}/pacientescitados?fecha=${isFecha}&medico=022`
    );
  }
}
