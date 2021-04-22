import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';
import { AgendaMedicaData } from '../../../core/models/Agenda-Medica-data.class';
@Component({
  selector: 'app-agendasecretaria-list',
  templateUrl: './agendasecretaria-list.component.html',
  styleUrls: ['./agendasecretaria-list.component.css'],
})
export class AgendasecretariaListComponent implements OnInit {
  agendaMedicaslists$: Observable<any>;
  agendaMedicaData$: Observable<any>;
  p: number = 1;
  status = false;
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private AGS: AgendasecretariaService) {}

  ngOnInit(): void {
    this.getAgendaMedicaList();
  }

  agendar() {
    this.AGS._modal.next();
  }

  getAgendaMedicaData() {
    this.agendaMedicaData$ = this.AGS._dataProgramacion.pipe(
      map((data: any) => new AgendaMedicaData(data))
    );
  }

  getAgendaMedicaList() {
    this.agendaMedicaslists$ = this.AGS._idProgramacion.pipe(
      tap((_) => (this.status = true)),
      switchMap((data: any) => this.AGS.getAgenMedica(data)),
      tap((_) => this.getAgendaMedicaData())
    );
  }
}
