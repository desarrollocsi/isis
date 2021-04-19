import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';

@Component({
  selector: 'app-agendasecretaria-list',
  templateUrl: './agendasecretaria-list.component.html',
  styleUrls: ['./agendasecretaria-list.component.css'],
})
export class AgendasecretariaListComponent implements OnInit {
  agendaMedicas$: Observable<any>;
  p: number = 1;
  status = false;
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private AGS: AgendasecretariaService) {}

  ngOnInit(): void {
    this.getAgendaMedica();
  }

  agendar() {
    this.AGS._modal.next();
  }

  getAgendaMedica() {
    this.agendaMedicas$ = this.AGS._idProgramacion.pipe(
      filter((id: string) => id.length > 0),
      tap((_) => (this.status = true)),
      switchMap((id: string) => this.AGS.getAgenMedica(id))
    );
  }
}
