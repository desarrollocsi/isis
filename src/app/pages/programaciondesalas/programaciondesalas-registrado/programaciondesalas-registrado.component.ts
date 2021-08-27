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
  form$: Observable<any>;
  form: FormGroup;

  get participantes(): FormArray {
    return this.form.get('participantes') as FormArray;
  }

  get equiposMedicos(): FormArray {
    return this.form.get('equipos') as FormArray;
  }

  get cirujano() {
    return this.participantes.at(0).get('descripcionPersonal');
  }

  get tiempoDeIntervencion() {
    return this.form.get('tiempo');
  }

  get cama() {
    return this.form.get('cama').errors;
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
      area: [null],
      estancia: [null],
      cq_pedido: [null],
      participantes: this.fb.array([]),
      equipos: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
    this.form$ = this.programacionDeSalasServices.getFormDynamic();
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
    this.participantes.clear();
    const { codigo, tiempo } = JSON.parse(data);

    const participantes =
      this.programacionDeSalasServices.getParticipantes(codigo);
    participantes.map((data) => {
      data['descripcionPersonal'] = null;
      this.participantes.push(this.fb.group(data));
    });

    this.tiempoDeIntervencion.reset({ value: tiempo, disabled: true });
    this.codigoIntervencion.setValue(codigo);
  }

  setAsignacionCirujano(codigo: string) {
    this.cirujano.reset({ value: codigo, disabled: true });
  }

  addPush(event: any, data: any) {
    const { checked } = event;
    const equiposMedicos = { codigo: data.value, estado: 1 };
    checked && this.equiposMedicos.push(this.fb.group(equiposMedicos));
    !checked && this.deleteEquiposMedicos(data);
  }

  deleteEquiposMedicos(data: any) {
    const indice = this.equiposMedicos.value.findIndex(
      (val: any) => val.value == data.value
    );
    this.equiposMedicos.removeAt(indice);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
