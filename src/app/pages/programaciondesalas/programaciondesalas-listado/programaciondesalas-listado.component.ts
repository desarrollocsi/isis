import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProgramaciondesalasService } from '../services/programaciondesalas.service';
import { IntermedaryService } from '../../../core/services';
import { ProgramacionModel } from '../db/programacion.model';

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
  }

  getAgendaSoap() {
    this.agendaSoaps$ = this.IntermedaryService._fecha.pipe(
      switchMap((fecha: string) =>
        this.ProgramaciondesalasService.getAgendaSoap(fecha)
      )
    );
  }

  onRegistrar() {
    this.Router.navigate(['home/programaciondesalas/registrar']);
  }

  views(data: any) {
    this.IntermedaryService.modal.next(data);
  }

  onUpdate({ cq_numope }: { cq_numope: string }) {
    this.ProgramaciondesalasService.getProgramacionDeSalas(cq_numope).subscribe(
      (data: any) => {
        this.IntermedaryService.getCodigoProgramacion(data);
        this.ProgramaciondesalasService.httpDynamic.next({
          verbo: 'PUT',
          nameButton: 'Actualizar',
        });
      }
    );
    this.Router.navigate(['home/programaciondesalas/registrar']);
  }

  onInformeOperatorio({ cq_numope }) {
    this.ProgramaciondesalasService.getProgramacionDeSalas(cq_numope).subscribe(
      (data) => this.IntermedaryService.getCodigoProgramacion(data)
    );
    this.Router.navigate(['home/programaciondesalas/informeoperatorio']);
  }

  onReprogramar(data: any) {
    this.ProgramaciondesalasService.getDataProgramacion(data);
    this.Router.navigate(['home/programaciondesalas/reprogramar']);
  }
}
