import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProgramaciondesalasService } from '../services/programaciondesalas.service';
import { IntermedaryService } from '../../../core/services';

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
  agendaSoaps$: Observable<any>;
  fecha: string;
  constructor(
    private ProgramaciondesalasService: ProgramaciondesalasService,
    private IntermedaryService: IntermedaryService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.getAgendaSoap();
    // this.IntermedaryService.refresh.subscribe((_) => this.getAgendaSoap());
  }

  getAgendaSoap() {
    this.agendaSoaps$ = this.IntermedaryService._fecha.pipe(
      switchMap((fecha: string) =>
        this.ProgramaciondesalasService.getAgendaSoap(fecha)
      )
    );
  }

  nextOpenRegistrar() {
    this.Router.navigate(['home/programaciondesalas/registrar']);
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
