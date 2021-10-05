import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ProgramaciondesalasService } from '../services';
import { transformarData } from '../utils';

@Component({
  selector: 'app-programaciondesalas-reprogramar',
  templateUrl: './programaciondesalas-reprogramar.component.html',
  styleUrls: ['./programaciondesalas-reprogramar.component.css'],
})
export class ProgramaciondesalasReprogramarComponent
  implements OnInit, OnDestroy
{
  datas$: Observable<any>;
  salas$: Observable<any>;
  data: {};
  form: FormGroup;
  private readonly unsubscribe$: Subject<void> = new Subject();

  get numeroDeIntervencion() {
    return this.form.get('cq_numope');
  }

  constructor(
    private ProgramaciondesalasService: ProgramaciondesalasService,
    private Router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cq_numope: [null],
      sa_codsal: [{ value: null, disabled: true }],
      cq_fecha: [{ value: null, disabled: true }],
      cq_hoinpr: [{ value: null, disabled: true }],
      cq_hofipr: [{ value: null, disabled: true }],
      cq_indrep: ['1'],
    });

    this.getDataProgramacion();
    this.getDataHorarioProgramacion();
    this.salas$ = this.ProgramaciondesalasService.getSalas();
  }

  getDataProgramacion() {
    this.datas$ = this.ProgramaciondesalasService.__data.pipe(
      tap((data) => this.backAgendaSop(data))
    );
  }

  backAgendaSop(data: any) {
    !data && this.Router.navigate(['home/programaciondesalas']);
    data && this.setData(data);
  }

  setData(data: any) {
    this.ProgramaciondesalasService.gettiempoDeIntervencion(data);
    this.numeroDeIntervencion.setValue(data.cq_numope);
  }

  getDataHorarioProgramacion() {
    this.ProgramaciondesalasService.dataHorarioDeProgramacion
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.form.patchValue(data));
  }

  onSubmit() {
    this.ProgramaciondesalasService.getReprogramacion(
      transformarData(this.form.getRawValue())
    ).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
