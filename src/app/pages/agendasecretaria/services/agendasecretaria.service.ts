import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ProgramacionAgenda } from '../../../core/models/programacion-agenda.class';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendasecretariaService {
  constructor(private http: HttpClient) {}

  getEspecialidades(fecha: string) {
    return this.http
      .get(
        `http://192.168.10.144:8002/especialidadesprogramacion?fecha=${fecha}`
      )
      .pipe(
        map((data: any) =>
          data.map((data: any) => new ProgramacionAgenda(data))
        )
      );
  }

  getMedico(data: any) {
    const { fecha, especialidad } = data;
    return this.http.get(
      `http://192.168.10.144:8002/medicosprogramacion?fecha=${fecha}&especialidad=${especialidad}`
    );
  }

  getAgenMedica(id: string) {
    return this.http.get(
      `http://192.168.10.144:8002/agendamedica?programacion=${id}`
    );
  }

  /**************INTERMEDIARIO**************/

  _modal = new Subject<void>();

  private idProgramacion = new BehaviorSubject<any>([]);
  _idProgramacion = this.idProgramacion.asObservable();

  getIdProgramacion(id: string) {
    this.idProgramacion.next(id);
  }

  get openModal() {
    return this._modal;
  }
}
