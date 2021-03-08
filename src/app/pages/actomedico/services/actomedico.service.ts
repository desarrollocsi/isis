import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActomedicoService {
  constructor(private http: HttpClient) {}

  getCie(search: string) {
    if (search.length === 0) {
      return of([]);
    }
    return this.http.get(`http://192.168.10.144:8002/cie10?search=${search}`);
  }

  postActoMedico(data: any) {
    return this.http.post('http://192.168.10.144:8002/actomedico', data);
  }
}
