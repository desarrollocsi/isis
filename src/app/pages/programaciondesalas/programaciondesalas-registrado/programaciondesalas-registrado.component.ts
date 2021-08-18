import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProgramaciondesalasService } from '../services';

@Component({
  selector: 'app-programaciondesalas-registrado',
  templateUrl: './programaciondesalas-registrado.component.html',
  styleUrls: ['./programaciondesalas-registrado.component.css'],
})
export class ProgramaciondesalasRegistradoComponent implements OnInit {
  camas$: Observable<any>;
  especialidades$: Observable<any>;
  intervenciones$: Observable<any>;
  medicos$: Observable<any>;
  anestesias$: Observable<any>;
  form: FormGroup;

  get participantes(): FormArray {
    return this.form.get('participantes') as FormArray;
  }

  get cirujano() {
    return this.participantes.at(0).get('descripcionPersonal');
  }

  get tiempoDeIntervencio() {
    return this.form.get('tiempo');
  }

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cama: [null],
      especialidad: [null],
      medico: [null],
      intervencion: [null],
      anestesia: [null],
      petitori: [null],
      semana: [null],
      tiempo: [null],
      antibiotico: [null],
      participantes: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.intervenciones$ = this.programacionDeSalasServices.getIntervenciones();
    this.medicos$ = this.programacionDeSalasServices.getMedicos();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
  }

  changeMedicoIntervecion(codigo: string) {
    console.log(codigo);
  }

  setParticipantes(codigo: string) {
    console.log(codigo);
  }

  setAsignacionCirujano(codigo: string) {
    console.log(codigo);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
