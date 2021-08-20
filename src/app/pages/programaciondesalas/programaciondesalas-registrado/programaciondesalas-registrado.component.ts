import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  get tiempoDeIntervencion() {
    return this.form.get('tiempo');
  }

  get codigoIntervencion() {
    return this.form.get('intervencion1');
  }

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService
  ) {}

  intervencion = new FormControl(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      cama: [null],
      especialidad: [null],
      medico: [null],
      intervencion1: [null],
      intervencion2: [null],
      intervencion3: [null],
      anestesia: [null],
      petitori: [null],
      semana: [null],
      tiempo: [null],
      antibiotico: [null],
      participantes: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
  }

  changeMedicoIntervecion(codigo: string) {
    this.MedicosPorEspecialidad(codigo);
    this.intervencionesPorEspecialidad(codigo);
  }

  MedicosPorEspecialidad(codigoDeEspecialidad: string) {
    this.medicos$ =
      this.programacionDeSalasServices.getMedicos(codigoDeEspecialidad);
  }

  intervencionesPorEspecialidad(codigoDeEspecialidad: string) {
    this.intervenciones$ =
      this.programacionDeSalasServices.getIntervenciones(codigoDeEspecialidad);
  }

  setParticipantes(data: string) {
    const { codigo, tiempo } = JSON.parse(data);

    const participantes =
      this.programacionDeSalasServices.getParticipantes(codigo);
    participantes.map((data) => {
      data['descripcionPersonal'] = null;
      this.participantes.push(this.fb.group(data));
    });

    this.tiempoDeIntervencion.setValue(tiempo);
    this.codigoIntervencion.setValue(codigo);
  }

  setAsignacionCirujano(codigo: string) {
    this.cirujano.reset({ value: codigo, disabled: true });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
