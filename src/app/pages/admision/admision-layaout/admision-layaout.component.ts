import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { PACIENTE } from '../data/';

@Component({
  selector: 'app-admision-layaout',
  templateUrl: './admision-layaout.component.html',
  styleUrls: ['./admision-layaout.component.css'],
})
export class AdmisionLayaoutComponent implements OnInit {
  datas$: Observable<any>;
  form: FormGroup;
  coberturas$: Observable<any>;

  isCobertura: boolean = false;
  isAutorizacion: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idacreditacion: [null],
      idcobertura: [null],
      cobertura: [null],
      idautorizacion: [null],
      idcitas: [null],
      observacion: [null],
      copago_fijo: [null],
      copago_variable: [null],
      numero_autorizacion: [null],
    });

    this.getDatas();
  }

  getCoberturas(cobertura: any) {
    this.isCobertura = true;
    this.coberturas$ = of(cobertura);
  }

  getDatas() {
    this.datas$ = of(PACIENTE);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
