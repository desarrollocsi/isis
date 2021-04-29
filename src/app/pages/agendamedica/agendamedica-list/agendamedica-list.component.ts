import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AgendamedicaService } from '../services/agendamedica.service';
import { IntermedaryService, AuthStorageService } from '../../../core/services';

@Component({
  selector: 'app-agendamedica-list',
  templateUrl: './agendamedica-list.component.html',
  styleUrls: ['./agendamedica-list.component.css'],
})
export class AgendamedicaListComponent implements OnInit {
  status: boolean = false;
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
    this.IS.getDatoDePaciente(data);
    this.router.navigate(['home/actomedico']);
  }
}
