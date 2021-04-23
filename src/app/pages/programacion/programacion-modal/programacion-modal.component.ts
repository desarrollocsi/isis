import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProgramacionService } from '../services/programacion.service';

import {
  IntermedaryService,
  HttpService,
  ToasterService,
} from 'src/app/core/services';

import { Programacion } from '../model/Programacion.class';

import * as moment from 'moment';

@Component({
  selector: 'app-programacion-modal',
  templateUrl: './programacion-modal.component.html',
  styleUrls: ['./programacion-modal.component.css'],
})
export class ProgramacionModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  checkedModal = false;
  especialidades$: Observable<any>;
  medicos$: Observable<any>;
  turnos$: Observable<any>;
  consultorios$: Observable<any>;
  verbHttp: string = '';

  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private IS: IntermedaryService,
    private http: HttpService,
    private PS: ProgramacionService,
    private TS: ToasterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pr_fecha: [moment().format('YYYY-MM-DD')],
      pr_numero: [null],
      pr_servicio: [null],
      pr_medico: [null],
      pr_consultorio: [null],
      pr_turno: [null],
    });

    this.getEspecialidades();
    this.getTurno();
    this.getConsultorios();
    this.openModal();
    this.setValue();
    this.onVerbHttp();
  }

  openModal() {
    this.IS.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => (this.checkedModal = true));
  }

  closeModal() {
    this.form.reset();
    this.checkedModal = false;
  }

  onVerbHttp() {
    this.PS._verbhttp
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.verbHttp = data));
  }

  setValue() {
    this.PS._dataProgramacion
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.getMedico(data.pr_servicio);
        this.form.setValue(new Programacion(data));
      });
  }

  getEspecialidades() {
    this.especialidades$ = this.http.getEspecialidades();
  }

  getMedico(id: any) {
    this.medicos$ = this.http.getMedicos(id);
  }

  getTurno() {
    this.turnos$ = this.http.getTurnos();
  }

  getConsultorios() {
    this.consultorios$ = this.http.getConsultorio();
  }

  onSubmit() {
    this.PS.apiDinamic(this.form.value, this.verbHttp)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.checkedModal = false;
        this.TS.show('success', 'Bien hecho!', data.message, 3000);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
