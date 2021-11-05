import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { F419Service } from '../services';
import { MessageService } from '../../../core/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import * as moment from 'moment';

@Component({
  selector: 'app-f419-eventoadverso-registrar-edit',
  templateUrl: './f419-eventoadverso-registrar-edit.component.html',
  styleUrls: ['./f419-eventoadverso-registrar-edit.component.css'],
})
export class F419EventoadversoRegistrarEditComponent
  implements OnInit, OnDestroy
{
  form: FormGroup;
  submit: boolean = false;
  title: string = 'F419 Reporte de I/EA - Asistencial';
  involucrados$: Observable<any>;
  verb: string = 'POST';
  nameButton: string = 'Registrar';
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private F419Service: F419Service,
    private MessageService: MessageService,
    private Router: Router
  ) {}

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  get id() {
    return this.form.get('id').value;
  }

  get detalleValue() {
    return this.detalles.value;
  }

  get f() {
    return this.form.controls;
  }

  get fecha() {
    return (
      this.f.fecha_incidencia.invalid &&
      (this.f.fecha_incidencia.dirty || this.f.fecha_incidencia.touched)
    );
  }

  get historia() {
    return (
      this.f.historia.invalid &&
      (this.f.historia.dirty || this.f.historia.touched)
    );
  }

  get reportaArea() {
    return (
      this.f.reporta_area.invalid &&
      (this.f.reporta_area.dirty || this.f.reporta_area.touched)
    );
  }

  get glosa() {
    return this.f.glosa.invalid && (this.f.glosa.dirty || this.f.glosa.touched);
  }

  get turno() {
    return this.submit && this.f.turno.invalid;
  }

  get involucrados() {
    return this.detalles.length === 0 && this.submit;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      fecha_incidencia: [null, [Validators.required]],
      historia: [null, [Validators.required]],
      glosa: [null, [Validators.required]],
      turno: [null, [Validators.required]],
      reporta_area: [null, [Validators.required]],
      usuario_registro: ['YVALDEZ'],
      detalles: this.fb.array([]),
    });
    this.setFormData();
    this.involucrados$ = this.F419Service.getInvolucradosIEA().pipe(
      tap((data: any) => this.addControl(data))
    );

    console.log(this.detalles.length);
    console.log(this.f.turno.invalid);
  }

  addControl(data: any) {
    data.map(({ detalles }) =>
      detalles.map(({ id }) => this.form.addControl(id, new FormControl(false)))
    );

    this.form.addControl('usuario_actualizado', new FormControl('YVALDEZ'));
    this.form.addControl(
      'fecha_actualizado',
      new FormControl(moment().format('YYYY-MM-DD HH:mm:ss'))
    );
  }

  setFormData() {
    this.F419Service.idIncidencia
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ verb, nameButton, data }) => {
        this.form.patchValue(data);
        data.detalles.map((detalle: any) => {
          setTimeout(() => {
            this.form.get(`${detalle.value}`).reset(true);
          }, 300);
          this.detalles.push(this.fb.group(detalle));
        });
        this.verb = verb;
        this.nameButton = nameButton;
      });
  }

  indexDetalle = (codigoDetalle: string) =>
    this.detalleValue.findIndex(({ codigo }) => codigo === codigoDetalle);

  addDetail({ checked }, { id, idinvolucrados }) {
    checked &&
      this.detalles.push(
        this.fb.group({
          value: id,
          tipo: idinvolucrados,
          usuario_registro: 'YVALDEZ',
        })
      );
    !checked && this.detalles.removeAt(this.indexDetalle(id));
  }

  onSubmit() {
    this.submit = true;
    if (this.form.invalid) return;
    this.F419Service.apiDynamic({
      verb: this.verb,
      data: this.form.value,
    }).subscribe(
      (data: any) => this.onSuccess(data),
      (error: any) => this.MessageService.MessageError(error)
    );
  }

  onSuccess({ message }) {
    this.MessageService.MessageSucces(message);
    this.Router.navigate(['home/calidad/f419']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
