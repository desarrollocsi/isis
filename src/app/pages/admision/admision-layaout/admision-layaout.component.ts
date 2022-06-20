import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { PACIENTE, DATA__ATENCION } from '../data/';
import { Cobertura, WebserviceSualudNombre } from '../models';
import { HttpService } from '../services/http.service';

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
  isLoading: boolean = false;

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
    if (datoPaciente.length === 0) {
      this.searchPacientesClear();
      return;
    }

    this.searchPaciente$ = of(
      PACIENTE.filter(
        ({ paciente, documento }) =>
          paciente.includes(datoPaciente.toUpperCase()) ||
          documento.includes(datoPaciente.toUpperCase())
      )
    );
  }

  selectAcreditacion(datas: any) {
    this.isLoading = true;
    this.datas$ = this.httpService.consultaNombre(
      new WebserviceSualudNombre(datas)
    );

    this.datasPacientes$ = this.httpService.getDataPaciente(datas);

    this.paciente$ = combineLatest([this.datas$, this.datasPacientes$]).pipe(
      map(([data, datasPacientes]) => {
        return { datasPacientes, data };
      }),
      finalize(() => (this.isLoading = false))
    );

    this.searchPacientesClear();
  }

  getCoberturas(acreditacion: any) {
    this.isLoading = true;
    this.coberturas$ = this.httpService
      .consultaCoberturas(acreditacion)
      .pipe(finalize(() => (this.isLoading = false)));
  }

  getCoberturasSeleccionada(cobertura: any) {
    this.isCobertura = false;
    this.isAutorizacion = true;
    this.form.patchValue(new Cobertura(cobertura));
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
