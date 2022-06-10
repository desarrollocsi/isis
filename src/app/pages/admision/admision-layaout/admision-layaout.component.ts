import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PACIENTE, DATAS } from '../data/';
import { Cobertura } from '../models';

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

    // this.getDatas();
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
      DATAS.filter(
        ({ paciente, documento }) =>
          paciente.includes(datoPaciente) || documento.includes(datoPaciente)
      )
    );
  }

  paciente(idPaciente: number): Observable<any> {
    return of(PACIENTE.find(({ id }) => id === idPaciente));
  }

  selectAcreditacion({ id }: { id: number }) {
    this.datas$ = this.paciente(id);
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
