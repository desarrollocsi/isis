import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { IntermedaryService } from '../../core/services/intermedary.service';
import { AgendasecretariaService } from './services/agendasecretaria.service';

import { HttpService } from '../../core/services/http.service';

@Component({
  selector: 'app-agendasecretaria',
  templateUrl: './agendasecretaria.component.html',
  styleUrls: ['./agendasecretaria.component.css'],
})
export class AgendasecretariaComponent implements OnInit, OnDestroy {
  especialidades$: Observable<any>;
  medicos$: Observable<any>;

  constructor(
    private IS: IntermedaryService,
    private AS: AgendasecretariaService,
    private http: HttpService
  ) {}

  especialidad = new FormControl({ value: null, disabled: true });
  medico = new FormControl({ value: null, disabled: true });

  private readonly unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.getEspecialidades();
    this.http.getEspecialidades;
  }

  getEspecialidades() {
    this.especialidades$ = this.IS._fecha.pipe(
      filter((data) => data !== ''),
      tap((_) => this.especialidad.enable()),
      switchMap((fecha: string) => this.AS.getEspecialidades(fecha)),
      tap(console.log)
    );
  }

  getMedicos(id: string) {
    this.medicos$ = this.AS.getMedico(id).pipe(
      tap((_) => this.medico.enable())
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
