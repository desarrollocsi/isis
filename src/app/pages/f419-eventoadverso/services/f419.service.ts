import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class F419Service {
  constructor(private http: HttpClient) {}

  /**ENDPOINTS**/

  getIncidencia() {
    return this.http.get('http://127.0.0.1:8000/incidencias');
  }

  getIncidenciaDetail(id: number) {
    return this.http.get(`http://127.0.0.1:8000/incidencia/${id}/`);
  }

  apiDynamic({ verb, data }) {
    const END_POINT = {
      POST: this.http.post('http://127.0.0.1:8000/incidencias', data),
      PUT: this.http.put(`http://127.0.0.1:8000/incidencia/${data.id}`, data),
    };

    return END_POINT[verb];
  }

  /**SUBJECT**/
  private __idIncidencia = new Subject<any>();

  get idIncidencia() {
    return this.__idIncidencia;
  }
}
