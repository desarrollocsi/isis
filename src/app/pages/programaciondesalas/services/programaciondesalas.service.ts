import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { data, especialidades, camas, medicos } from '../db/db';

import { formDynamic } from '../db/form__dynamic';

import { AuthStorageService } from '../../../core/services';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramaciondesalasService {
  constructor(
    private http: HttpClient,
    private AuthStorageService: AuthStorageService
  ) {}

  getAgendaSoap(fecha: string) {
    return this.http.get(`http://127.0.0.1:8000/agendasoap/${fecha}`);
  }

  getSalas() {
    return this.http.get('http://127.0.0.1:8000/salas');
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
    if (this.AuthStorageService.personal) {
      return of(this.AuthStorageService.personal);
    }

    // return this.http
    //   .get('http://127.0.0.1:8000/personales')
    //   .pipe(tap((data: any) => this.AuthStorageService.setPersonal(data)));
  }

  getDisponibilidadDeSalas(fecha: string, sala: string) {
    return this.http.get(
      `http://127.0.0.1:8000/disponibilidadsalas/${sala}/${fecha}`
    );
  }

  getFormDynamic() {
    return of(formDynamic);
  }

  getProgramacionDeSalas(codigoProgramacion: string) {
    return this.http.get(
      `http://127.0.0.1:8000/programacion/${codigoProgramacion}/`
    );
  }

  postRegistroDeProgramacion(data: any) {
    return this.http.post('http://127.0.0.1:8000/programaciones', data);
  }
}
