import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { AgendamedicaService } from '../services/agendamedica.service';
import { IntermedaryService, AuthStorageService } from '../../../core/services';

@Component({
  selector: 'app-agendamedica-list',
  templateUrl: './agendamedica-list.component.html',
  styleUrls: ['./agendamedica-list.component.css'],
})
export class AgendamedicaListComponent implements OnInit, OnDestroy {
  status: boolean = false;
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private AS: AgendamedicaService,
    private router: Router,
    private IS: IntermedaryService,
    private AST: AuthStorageService
  ) {}

  get usuario() {
    return this.AST.User;
  }

  pacientesCitados$: Observable<any>;
  p: number = 1;
  ngOnInit(): void {
    this.pacientesCitados$ = this.IS._fecha.pipe(
      switchMap((fecha: string) => this.AS.getListadoCitas(fecha)),
      tap((data) => (this.status = this.validacionDatos(data)))
    );
  }

  private validacionDatos(data: any) {
    return data.length > 0 ? true : false;
  }

  pagesActomedico(data: any) {
    const { id, actomedico_id } = data;
    this.IS.getDatoDePaciente(data);
    if (actomedico_id) this.DataActomedico(actomedico_id);
    this.router.navigate(['home/actomedico']);
  }

  DataActomedico(id: string) {
    this.AS.getActoMedico(id).subscribe((data) => {
      this.IS.getDataActoMedico(data);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
