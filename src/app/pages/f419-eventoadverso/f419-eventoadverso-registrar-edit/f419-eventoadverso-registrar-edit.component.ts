import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-f419-eventoadverso-registrar-edit',
  templateUrl: './f419-eventoadverso-registrar-edit.component.html',
  styleUrls: ['./f419-eventoadverso-registrar-edit.component.css'],
})
export class F419EventoadversoRegistrarEditComponent implements OnInit {
  form: FormGroup;
  submit: boolean = false;
  title: string = 'F419 REPORTE DE INCIDENCIA/EVENTO ADVERSO - ASISTENCIAL';
  constructor(private fb: FormBuilder) {}

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  get detalleValue() {
    return this.detalle.value;
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
      fecha: [null, [Validators.required]],
      historia: [null, [Validators.required]],
      glosa: [null, [Validators.required]],
      turno: [null, [Validators.required]],
      usuario: [null],
      asociada: [null],
      colaborador: [null],
      diagnostico: [null],
      detalle: this.fb.array([]),
    });
  }

  indexDetalle = (codigoDetalle: string) =>
    this.detalleValue.findIndex(({ codigo }) => codigo === codigoDetalle);

  addDetail({ value, checked }) {
    checked && this.detalle.push(this.fb.group({ codigo: value }));
    !checked && this.detalle.removeAt(this.indexDetalle(value));
  }

  onSubmit() {
    this.submit = true;
    console.log(this.form.value);
  }
}
