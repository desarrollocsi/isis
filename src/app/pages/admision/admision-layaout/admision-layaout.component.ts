import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
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

  isCobertura: boolean = false;
  isAutorizacion: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

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
    this.getAtenciones();
  }

  getAtenciones() {
    this.atenciones$ = of(DATA__ATENCION);
  }

  searchPacientesClear() {
    this.searchPaciente$ = of([]);
  }

  buscarPaciente(datoPaciente: string, event: any) {
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

  paciente(idPaciente: number): Observable<any> {
    return of(PACIENTE.find(({ id }) => id === idPaciente));
  }

  selectAcreditacion(data: any) {
    // this.datas$ = this.paciente(id);
    this.datas$ = this.httpService.consultaNombre(
      new WebserviceSualudNombre(data)
    );
    this.searchPacientesClear();
  }

  getCoberturas(cobertura: any) {
    this.isCobertura = true;
    this.coberturas$ = of(cobertura);
  }

  getCoberturasSeleccionada(cobertura: any) {
    this.isCobertura = false;
    this.isAutorizacion = true;
    this.form.patchValue(new Cobertura(cobertura));
  }

  getDatas() {
    this.datas$ = of(PACIENTE);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
