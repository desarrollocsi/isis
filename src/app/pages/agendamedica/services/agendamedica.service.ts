import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgendamedicaService {
  constructor(private http: HttpClient) {}

  getListadoCitas() {
    return this.http.get(
      'http://192.168.10.144:8002/pacientescitados?fecha=2021-02-23&medico=034'
    );
  }
}
