import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from '../../../../environments/environment';

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
    switch (verb) {
      case 'POST': {
        return this.http.post(`${environment.apiUrl}/actomedico`, data);
      }
      case 'PUT': {
        return this.http.put(
          `${environment.apiUrl}/actomedico/${data.id}`,
          data
        );
      }
    }
  }
}
