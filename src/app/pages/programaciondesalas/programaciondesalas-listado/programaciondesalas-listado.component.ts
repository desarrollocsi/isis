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
  datas: any = [];
  reprogramacion: string;

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

  action(data: any) {
    this.ProgramaciondesalasService.gethttpDynamic(data);
  }

  dataProgramacion(codigoDeProgramacion: string) {
    this.ProgramaciondesalasService.getProgramacionDeSalas(
      codigoDeProgramacion
    ).subscribe((data: any) =>
      this.IntermedaryService.getCodigoProgramacion(data)
    );
    this.Router.navigate(['home/programaciondesalas/registrar']);
  }

  onRegistrar() {
    this.action({ verbo: 'POST', nameButton: 'Registrar' });
    this.Router.navigate(['home/programaciondesalas/registrar']);
  }

  onUpdate({ cq_numope }: { cq_numope: string }) {
    this.dataProgramacion(cq_numope);
    this.action({ verbo: 'PUT', nameButton: 'Actualizar' });
  }

  onReprogramar({ cq_numope }: { cq_numope: string }) {
    this.action({ verbo: 'PUT', nameButton: 'Reprogramar' });
    this.dataProgramacion(cq_numope);
  }

  onSuspender({ cq_numope }: { cq_numope: string }) {
    this.action({ verbo: 'PUT', nameButton: 'Suspender' });
    this.dataProgramacion(cq_numope);
  }

  onActoQuirurgico({ cq_numope }) {
    this.action({ verbo: 'PUT', nameButton: 'Acto quirurgico' });
    this.dataProgramacion(cq_numope);
  }

  onInformeOperatorio({ cq_numope, inf_ope }) {
    this.ProgramaciondesalasService.getProgramacionDeSalasData(
      cq_numope
    ).subscribe((data: any) => {
      this.IntermedaryService.getCodigoProgramacion(data);
      inf_ope &&
        this.ProgramaciondesalasService.getDataInformenOperatorio(cq_numope);
    });
    this.Router.navigate(['home/programaciondesalas/informeoperatorio']);
  }
}
