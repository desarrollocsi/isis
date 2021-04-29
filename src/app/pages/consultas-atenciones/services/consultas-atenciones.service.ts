import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { ConsultasAtenciones } from '../model/consultas-atenciones.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsultasAtencionesService {
  constructor(private http: HttpClient) {}

  getConsultasAtenciones(search: string) {
    return this.http
      .get(`${environment.apiUrl}/listaratenciones/${search.padStart(10, '0')}`)
      .pipe(
        map((data: any) => {
          return data.status === undefined
            ? data.map((val: any) => new ConsultasAtenciones(val))
            : [data];
        })
      );
  }
}
