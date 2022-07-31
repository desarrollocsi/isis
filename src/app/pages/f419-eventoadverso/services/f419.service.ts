import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class F419Service {
  URL: string = 'http://apps2.clinicasantaisabel.com';
  //URL: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  /**ENDPOINTS**/

  getPaciente(text: string) {
    return this.http.get(`${environment.apiUrl}/historia/${text}/`);
  }

  getSearchPaciente(text: string) {
    return this.http.get(`${environment.apiUrl}/searchpaciente?search=${text}`);
  }

  getInvolucradosIEA() {
    return this.http.get(`${environment.apiUrl}/involucrados`);
  }

  getIncidencia({ fecha, rol, usuario }) {
    return this.http.get(
      `${environment.apiUrl}/incidencias/${fecha}/${rol}/${usuario}`
    );
  }

  getIncidenciaDetail(id: number) {
    return this.http.get(`${environment.apiUrl}/incidencia/${id}/`);
  }

  updateStatusIncidencia(data: any) {
    return this.http
      .put(`${environment.apiUrl}/incidenciachancestatus/${data.id}/`, data)
      .pipe(tap((_) => this.refresh.next()));
  }

  apiDynamic({ verb, data }) {
    const END_POINT = {
      POST: this.http.post(`${environment.apiUrl}/incidencias`, data),
      PUT: this.http.put(`${environment.apiUrl}/incidencia/${data.id}/`, data),
    };

    return END_POINT[verb];
  }

  /**SUBJECT**/
  private __refresh = new Subject<void>();
  private __idIncidencia = new Subject<any>();

  get idIncidencia() {
    return this.__idIncidencia;
  }

  get refresh() {
    return this.__refresh;
  }
}
