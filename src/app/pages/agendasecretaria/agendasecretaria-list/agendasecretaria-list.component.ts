import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';

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

  constructor(private AGS: AgendasecretariaService) {}

  ngOnInit(): void {
    this.getAgendaMedicaList();
  }

  openModal(data: any) {
    this.AGS._modal.next();
    this.AGS.setDataCupo(data);
  }

  getAgendaMedicaList() {
    this.agendaMedicaslists$ = this.AGS._idProgramacion.pipe(
      tap((_) => (this.status = true)),
      switchMap((data: any) => this.AGS.getAgenMedica(data)),
      tap((_) => this.getAgendaMedicaData())
    );
  }

  getAgendaMedicaData() {
    this.agendaMedicaData$ = this.AGS.getDataProgramacion();
  }
}
