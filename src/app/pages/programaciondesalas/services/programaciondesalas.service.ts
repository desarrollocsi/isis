import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { data, especialidades, camas, medicos } from '../db/db';

import { formDynamic } from '../db/form__dynamic';

@Injectable({
  providedIn: 'root',
})
export class ProgramaciondesalasService {
  constructor(private http: HttpClient) {}

  getAgendaSoap(fecha: string) {
    return this.http.get(`http://127.0.0.1:8000/agendasoap/${fecha}`);
  }

  getEspecialidades() {
    return of(especialidades);
  }

  getCamas() {
    return of(camas);
  }

  getMedicos(codigoDeEspecialidad: string) {
    return of(
      medicos.filter(
        (medicos) => medicos.codigoEspecialidad === codigoDeEspecialidad
      )
    );
  }

  getIntervenciones(codigoDeEspecialidad: string) {
    return this.http.get(
      `http://127.0.0.1:8000/intervencion/${codigoDeEspecialidad}/`
    );
  }

  getAnestesia() {
    return this.http.get(`http://127.0.0.1:8000/anestesia`);
  }

  getParticipantes(codigoIntervencion: string) {
    return this.http.get(
      `http://127.0.0.1:8000/participantes/${codigoIntervencion}/`
    );
  }

  getPersonales() {
    return this.http.get('http://127.0.0.1:8000/personales');
  }

  getSalas() {
    return this.http.get('http://127.0.0.1:8000/sala');
  }

  getFormDynamic() {
    return of(formDynamic);
  }

  postRegistroDeProgramacion(data: any) {
    return this.http.post('http://127.0.0.1:8000/programaciones', data);
  }
}
