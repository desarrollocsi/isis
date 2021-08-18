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

  getMedicos() {
    return of(medicos);
  }

  getIntervenciones() {
    return of(intervenciones);
  }

  getAnestesia() {
    return of(anestesia);
  }

  getParticipantes() {
    return of(participantes);
  }
}
