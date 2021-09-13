import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { programacion } from '../db/db';
import { ProgramacionModel } from '../db/programacion.model';

import { ProgramaciondesalasService } from '../services/programaciondesalas.service';

import { IntermedaryService } from '../../../core/services';

import * as moment from 'moment';

@Component({
  selector: 'app-programaciondesalas-listado',
  templateUrl: './programaciondesalas-listado.component.html',
  styleUrls: ['./programaciondesalas-listado.component.css'],
})
export class ProgramaciondesalasListadoComponent implements OnInit {
  programaciones$: Observable<ProgramacionModel[]>;
  agendaSoaps$: Observable<any>;
  fecha: string;
  constructor(
    private ProgramaciondesalasService: ProgramaciondesalasService,
    private IntermedaryService: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.programaciones$ = of(programacion);
    moment.locale('es');
    this.fecha = moment().format('dddd DD, MMMM YYYY');
    this.getAgendaSoap();
  }

  getAgendaSoap() {
    this.agendaSoaps$ = this.IntermedaryService._fecha.pipe(
      switchMap((fecha: string) =>
        this.ProgramaciondesalasService.getAgendaSoap(fecha)
      )
    );
  }

  views(data: any) {
    this.IntermedaryService.modal.next(data);
  }

  onUpdate({ codigo }: ProgramacionModel) {
    console.log(codigo);
  }

  onDelete({ codigo }: ProgramacionModel) {
    console.log(codigo);
  }
}
