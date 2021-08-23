import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { programacion } from '../db/db';
import { ProgramacionModel } from '../db/programacion.model';
import * as moment from 'moment';

@Component({
  selector: 'app-programaciondesalas-listado',
  templateUrl: './programaciondesalas-listado.component.html',
  styleUrls: ['./programaciondesalas-listado.component.css'],
})
export class ProgramaciondesalasListadoComponent implements OnInit {
  programaciones$: Observable<ProgramacionModel[]>;
  fecha: string;
  constructor() {}

  ngOnInit(): void {
    this.programaciones$ = of(programacion);
    moment.locale('es');
    this.fecha = moment().format('dddd DD, MMMM YYYY');
  }

  onUpdate({ codigo }: ProgramacionModel) {
    console.log(codigo);
  }

  onDelete({ codigo }: ProgramacionModel) {
    console.log(codigo);
  }
}
