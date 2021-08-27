import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  data,
  especialidades,
  camas,
  medicos,
  intervenciones,
  anestesia,
  participantes,
} from '../db/db';

import { formDynamic } from '../db/form__dynamic';

@Injectable({
  providedIn: 'root',
})
export class ProgramaciondesalasService {
  constructor() {}

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
    return of(
      intervenciones.filter(
        (intervenciones) =>
          intervenciones.codigoEspecialidad === codigoDeEspecialidad
      )
    );
  }

  getAnestesia() {
    return of(anestesia);
  }

  getParticipantes(codigo: string) {
    return participantes.filter(
      (participantes) => participantes.codigo === codigo
    );
  }

  getFormDynamic() {
    return of(formDynamic);
  }
}
