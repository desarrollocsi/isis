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
}
