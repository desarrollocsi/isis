import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getEspecialidades() {
    return this.http.get(`${environment.apiUrl}/especialidades/`);
  }

  getMedicos(id: any) {
    return this.http.get(
      `${environment.apiUrl}/medicosespecialidad?especialidad=${id}`
    );
  }

  getMedicosTodos() {
    return this.http.get(`${environment.apiUrl}/medicos/`);
  }

  getTurnos() {
    return this.http.get(`${environment.apiUrl}/turnos/`);
  }

  getConsultorio() {
    return this.http.get(`${environment.apiUrl}/consultorios/`);
  }

  getAntecedentes() {
    return this.http.get(`${environment.apiUrl}/antecedentes/`);
  }

  getPaises() {
    return this.http.get(`${environment.apiUrl}/paises/`);
  }

  getEstadoCiviles() {
    return this.http.get(`${environment.apiUrl}/estadosciviles/`);
  }

  getTipoDocumentos() {
    return this.http.get(`${environment.apiUrl}/tipodedocumentos/`);
  }

  getOcupaciones() {
    return this.http.get(`${environment.apiUrl}/ocupaciones/`);
  }
}
