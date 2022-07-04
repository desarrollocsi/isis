import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
//

import { medicamento, procedimiento } from '../data';

@Injectable({
  providedIn: 'root',
})
export class ActomedicoService {
  constructor(private http: HttpClient) {}

  getCie(search: string) {
    if (search.length === 0) {
      return of([]);
    }
    return this.http.get(`${environment.apiUrl}/cie10?search=${search}`);
  }

  postActoMedico(data: any) {
    return this.http.post(`${environment.apiUrl}/actomedico`, data);
  }

  deleteAntecedente() {
    return this.http.delete(`${environment.apiUrl}/ant)`);
  }

  deleteCiex() {
    return this.http.delete(`${environment.apiUrl}/ant)`);
  }

  apidynamic(verb: string, data: any) {
    const API__DYNAMIC = {
      POST: this.http.post(`${environment.apiUrl}/actomedico`, data),
      PUT: this.http.put(`${environment.apiUrl}/actomedico/${data.id}`, data),
    };

    return API__DYNAMIC[verb];
  }

  search({ text, key }) {
    const SEARCH__API_DYNAMIC = {
      MEDICAMENTO: () =>
        medicamento.filter(({ descripcion }) =>
          descripcion.includes(text.toUpperCase())
        ),
      PROCEDIMIENTO: () =>
        procedimiento.filter(({ descripcion }) =>
          descripcion.includes(text.toUpperCase())
        ),
    };

    return of(SEARCH__API_DYNAMIC[key]());
  }
}
