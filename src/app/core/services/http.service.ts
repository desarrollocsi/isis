import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getEspecialidades() {
    return this.http.get('http://192.168.10.144:8002/especialidades/');
  }

  getMedicos(id: any) {
    return this.http.get(
      `http://192.168.10.144:8002/medicosespecialidad?especialidad=${id}`
    );
  }

  getTurnos() {
    return this.http.get('http://192.168.10.144:8002/turnos/');
  }

  getConsultorio() {
    return this.http.get('http://192.168.10.144:8002/consultorios/');
  }

  getAntecedentes() {
    return this.http.get('http://192.168.10.144:8002/antecedentes');
  }
}
