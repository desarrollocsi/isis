import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { F419Service } from '../services';
import { MessageService } from '../../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  title: string = 'F419 REPORTE DE INCIDENCIA/EVENTO ADVERSO - ASISTENCIAL';
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

  get detalleValue() {
    return this.detalles.value;
  }

  get f() {
    return this.form.controls;
  }

  get fecha() {
    return this.f.fecha.invalid && (this.f.fecha.dirty || this.f.fecha.touched);
  }

  get historia() {
    return (
      this.f.historia.invalid &&
      (this.f.historia.dirty || this.f.historia.touched)
    );
  }

  get glosa() {
    return this.f.glosa.invalid && (this.f.glosa.dirty || this.f.glosa.touched);
  }

  get turno() {
    return this.submit && this.f.turno.invalid;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      fecha: [null, [Validators.required]],
      historia: [null, [Validators.required]],
      glosa: [null, [Validators.required]],
      turno: [null, [Validators.required]],
      usuario: ['YVALDEZ'],
      detalles: this.fb.array([]),
    });
    this.setForm();
  }

  setForm() {
    this.F419Service.idIncidencia
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue(data);
        data.detalles.map((value: any) =>
          this.detalles.push(this.fb.group(value))
        );
      });
  }

  indexDetalle = (codigoDetalle: string) =>
    this.detalleValue.findIndex(({ codigo }) => codigo === codigoDetalle);

  addDetail({ value, checked, dataset: { tipo } }) {
    checked &&
      this.detalles.push(this.fb.group({ value, tipo, usuario: 'YVALDEZ' }));
    !checked && this.detalles.removeAt(this.indexDetalle(value));
  }

  onSubmit() {
    this.submit = true;
    console.log(this.form.value);
    // if (this.form.invalid) return;
    // this.F419Service.apiDynamic({
    //   verb: 'POST',
    //   data: this.form.value,
    // }).subscribe(
    //   (data: any) => this.onSuccess(data),
    //   (error: any) => this.MessageService.MessageError(error)
    // );
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
