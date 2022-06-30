import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PACIENTE, DATA__ATENCION } from '../data/';
import { Cobertura } from '../models';
import { HttpService } from '../services/http.service';

interface Loadding {
  isLoading: boolean;
  message?: string;
}

@Component({
  selector: 'app-admision-layaout',
  templateUrl: './admision-layaout.component.html',
  styleUrls: ['./admision-layaout.component.css'],
})
export class AdmisionLayaoutComponent implements OnInit {
  datas$: Observable<any>;
  form: FormGroup;
  coberturas$: Observable<any>;
  searchPaciente$: Observable<any>;
  atenciones$: Observable<any>;
  datasPacientes$: Observable<any>;
  paciente$: Observable<any>;
  isCobertura: boolean = false;
  isAutorizacion: boolean = false;
  respuestaTrama$: Observable<any>;
  loading: Loadding;

  _copagoVariable: string;
  _copagoFijo: string;

  set copagoFijo(copagoFijo: string) {
    this._copagoFijo = copagoFijo;
  }

  set copagoVariable(copagoVariable: string) {
    this._copagoVariable = copagoVariable;
  }

  get copagoFijo() {
    return this._copagoFijo;
  }

  get copagoVariable() {
    return this._copagoVariable;
  }

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idacreditacion: [null],
      idcobertura: [null],
      cobertura: [{ value: null, disabled: true }],
      idautorizacion: [null],
      idcitas: [null],
      observacion: [null],
      copago_fijo: [{ value: null, disabled: true }],
      copago_variable: [{ value: null, disabled: true }],
      numero_autorizacion: [{ value: null, disabled: true }],
    });
    this.getAtenciones();
  }

  getAtenciones() {
    this.atenciones$ = of(DATA__ATENCION);
  }

  searchPacientesClear() {
    this.searchPaciente$ = of([]);
  }

  buscarPaciente(datoPaciente: string) {
    // if (datoPaciente.length === 0) {
    //   this.searchPacientesClear();
    //   return;
    // }

    this.searchPaciente$ = of(
      PACIENTE.filter(
        ({ paciente, documento }) =>
          paciente.includes(datoPaciente.toUpperCase()) ||
          documento.includes(datoPaciente.toUpperCase())
      )
    );
  }

  selectAcreditacion(datas: any) {
    this.coberturas$ = of(null);
    this.loading = { isLoading: true, message: 'Consultando acreditacion' };

    this.paciente$ = this.httpService.getPaciente(datas).pipe(
      finalize(() => {
        this.loading = { isLoading: false };
        this.isAutorizacion = false;
      })
    );
    this.searchPacientesClear();
  }

  getCoberturas(acreditacion: any) {
    this.loading = { isLoading: true, message: 'Consultando las coberturas' };
    this.coberturas$ = this.httpService
      .consultaCoberturas(acreditacion)
      .pipe(finalize(() => (this.loading = { isLoading: false })));
  }

  getCoberturasSeleccionada(cobertura: any) {
    this.isCobertura = false;
    this.isAutorizacion = true;
    this.form.patchValue(new Cobertura(cobertura));

    const { copago_variable, copago_fijo } = new Cobertura(cobertura);
    this.copagoVariable = copago_variable;
    this.copagoFijo = copago_fijo;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
