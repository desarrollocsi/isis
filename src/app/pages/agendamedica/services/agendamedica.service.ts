import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { AuthStorageService } from '../../../core/services';

import * as moment from 'moment';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgendamedicaService {
  constructor(private http: HttpClient, private ATS: AuthStorageService) {}

  getListadoCitas(fecha: string) {
    const isFecha = fecha ? fecha : moment().format('YYYY-MM-DD');
    return this.http.get(
      `${environment.apiUrl}/pacientescitados?fecha=${isFecha}&medico=${this.ATS.idMedico}`
    );
  }
}
