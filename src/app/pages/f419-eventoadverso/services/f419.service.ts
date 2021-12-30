import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class F419Service {
  URL: string = 'http://apps2.clinicasantaisabel.com';
  //URL: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  /**ENDPOINTS**/

  getPaciente(text: string) {
    return this.http.get(`${this.URL}/historia/${text}/`);
  }

  getSearchPaciente(text: string) {
    return this.http.get(`${this.URL}/searchpaciente?search=${text}`);
  }

  getInvolucradosIEA() {
    return this.http.get(`${this.URL}/involucrados`);
  }

  getIncidencia({ fecha, rol }) {
    return this.http.get(`${this.URL}/incidencias/${fecha}/${rol}`);
  }

  getIncidenciaDetail(id: number) {
    return this.http.get(`${this.URL}/incidencia/${id}/`);
  }

  updateStatusIncidencia(data: any) {
    return this.http
      .put(`${this.URL}/incidenciachancestatus/${data.id}/`, data)
      .pipe(tap((_) => this.refresh.next()));
  }

  apiDynamic({ verb, data }) {
    const END_POINT = {
      POST: this.http.post(`${this.URL}/incidencias`, data),
      PUT: this.http.put(`${this.URL}/incidencia/${data.id}/`, data),
    };

    return END_POINT[verb];
  }

  /**SUBJECT**/
  private __refresh = new Subject<any>();
  private __idIncidencia = new Subject<any>();

  get idIncidencia() {
    return this.__idIncidencia;
  }

  get refresh() {
    return this.__refresh;
  }
}
