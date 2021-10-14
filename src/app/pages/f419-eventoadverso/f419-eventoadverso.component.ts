import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthStorageService, MessageService } from 'src/app/core/services';

@Component({
  selector: 'app-f419-eventoadverso',
  templateUrl: './f419-eventoadverso.component.html',
  styleUrls: ['./f419-eventoadverso.component.css'],
})
export class F419EventoadversoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private MS: MessageService,
    private AST: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null],
      historia: [null],
      glosa: [null],
      turno: [null],
      usuario: [this.AST.User],
      detalle: this.fb.array([]),
    });
  }

  get detalleValue() {
    return this.detalle.value;
  }

  get detalle(): FormArray {
    return this.form.get('detalle') as FormArray;
  }

  indiceDetalle = (codigoDetalle: string) =>
    this.detalleValue.findIndex(({ codigo }) => codigo === codigoDetalle);

  addDetail({ value, checked }) {
    checked && this.detalle.push(this.fb.group({ codigo: value }));
    !checked && this.detalle.removeAt(this.indiceDetalle(value));
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
