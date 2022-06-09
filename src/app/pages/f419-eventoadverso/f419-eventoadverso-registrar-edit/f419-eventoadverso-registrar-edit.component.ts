import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { F419Service } from '../services';
import { MessageService } from '../../../core/services';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { fieldsUpdate } from '../db/db';

@Component({
  selector: 'app-f419-eventoadverso-registrar-edit',
  templateUrl: './f419-eventoadverso-registrar-edit.component.html',
  styleUrls: ['./f419-eventoadverso-registrar-edit.component.css'],
})
export class F419EventoadversoRegistrarEditComponent
  implements OnInit, OnDestroy
{
  form: FormGroup;
  involucrados$: Observable<any>;
  private readonly unsubscribe$: Subject<void> = new Subject();

  submit: boolean = false;
  title: string = 'F419 Reporte de I/EA';
  verb: string = 'POST';
  nameButton: string = 'Registrar';
  messageAsyncrono: string;
  isDisabledCheckBox: boolean = false;

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

  get historiaAsync() {
    return (
      this.f.historia.hasError('status') &&
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

  get isDisabled() {
    return this.verb == 'VIEWS' ? true : false;
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

    this.involucrados$ = this.F419Service.getInvolucradosIEA().pipe(
      tap((data: any) => this.addControl(data))
    );
    this.setFormData();
  }

  addControl(data: any) {
    data.map(({ detalles }) =>
      detalles.map(({ id }) =>
        this.form.addControl(
          id,
          new FormControl({ value: false, disabled: this.isDisabledCheckBox })
        )
      )
    );
  }

  patchData(data: any) {
    this.form.patchValue(data);
    data.detalles.map((detalle: any) => {
      setTimeout(() => this.form.get(`${detalle.value}`).reset(true), 300);
      this.detalles.push(this.fb.group(detalle));
    });
  }

  addFieldsUpdate() {
    fieldsUpdate.map(({ fields, value }) =>
      this.form.addControl(fields, new FormControl(value))
    );
  }

  formDisabled() {
    for (let key in this.form.value) this.form.get(`${key}`).disable();
    this.isDisabledCheckBox = true;
  }

  setFormData() {
    this.F419Service.idIncidencia
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ verb, nameButton, data }) => {
        this.verb = verb;
        this.nameButton = nameButton;
        if (['PUT', 'VIEWS'].includes(verb)) this.patchData(data);
        ['VIEWS'].includes(verb) && this.formDisabled();
      });
  }

  indexDetalle = (codigoDetalle: string) =>
    this.detalleValue.findIndex(({ codigo }) => codigo === codigoDetalle);

  addDetail(checked, { id, idinvolucrados }) {
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
    console.log(this.form.value);
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

export function validacionHistoria(api: any): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return api.getPaciente(control.value).pipe(
      map(({ hc_numhis, hc_apemat, hc_apepat, hc_nombre }) =>
        hc_numhis
          ? {
              status: true,
              message: `${hc_nombre} ${hc_apepat} ${hc_apemat}`,
            }
          : { status: false, message: 'La historia ingresada no es correcta' }
      )
    );
  };
}
