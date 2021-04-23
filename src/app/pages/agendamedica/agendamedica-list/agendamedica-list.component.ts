import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AgendamedicaService } from '../services/agendamedica.service';
import { IntermedaryService } from '../../../core/services';

@Component({
  selector: 'app-agendamedica-list',
  templateUrl: './agendamedica-list.component.html',
  styleUrls: ['./agendamedica-list.component.css'],
})
export class AgendamedicaListComponent implements OnInit {
  constructor(
    private AS: AgendamedicaService,
    private router: Router,
    private IS: IntermedaryService
  ) {}

  pacientesCitados$: Observable<any>;
  p: number = 1;
  ngOnInit(): void {
    this.pacientesCitados$ = this.IS._fecha.pipe(
      switchMap((fecha: string) => this.AS.getListadoCitas(fecha))
    );
  }

  pagesActomedico(data: any) {
    this.IS.getDatoDePaciente(data);
    this.router.navigate(['home/actomedico']);
  }
}
