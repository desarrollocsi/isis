import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  personales$: Observable<any>;
  anestesias$: Observable<any>;
  form$: Observable<any>;
  form: FormGroup;
  salas$: Observable<any>;
  sala: boolean = false;

  get participantes(): FormArray {
    return this.form.get('participantes') as FormArray;
  }

  get equiposMedicos(): FormArray {
    return this.form.get('equiposMedicos') as FormArray;
  }

  get cirujano() {
    return this.participantes.at(0).get('pl_codper');
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

  get forms() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService
  ) {}

  intervencion = new FormControl({ value: null, disabled: true });

  ngOnInit(): void {
    this.form = this.fb.group({
      cama: [null],
      especialidad: [null],
      medico: [{ value: null, disabled: true }],
      intervencion1: [{ value: null, disabled: true }],
      intervencion2: [{ value: null, disabled: true }],
      intervencion3: [{ value: null, disabled: true }],
      anestesia: [null],
      petitori: [null],
      semana: [null],
      tiempo: [null],
      antibiotico: [null],
      area: [null],
      estancia: [null],
      cq_pedido: [null],
      participantes: this.fb.array([]),
      equiposMedicos: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
    this.form$ = this.programacionDeSalasServices.getFormDynamic();

    this.programacionDeSalasServices.getSalas().subscribe(console.log);
  }

  camposReset() {
    this.intervencion.reset({ value: null, disabled: false });
    this.forms.intervencion1.reset({ value: null, disabled: false });
    this.forms.intervencion2.reset({ value: null, disabled: false });
    this.forms.intervencion3.reset({ value: null, disabled: false });
    this.forms.medico.reset({ value: null, disabled: false });
  }

  changeMedicoIntervecion(codigoDeEspecialidad: string) {
    this.MedicosPorEspecialidad(codigoDeEspecialidad);
    this.intervencionesPorEspecialidad(codigoDeEspecialidad);
    codigoDeEspecialidad && this.camposReset();
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
    const { cq_codiqx, cq_tiempo } = JSON.parse(data);
    this.participantes.clear();
    this.programacionDeSalasServices
      .getParticipantes(cq_codiqx)
      .subscribe((data: any) => {
        data.map((val: any) => {
          val['pl_codper'] = null;
          this.participantes.push(this.fb.group(val));
        });
      });
    this.tiempoDeIntervencion.reset(cq_tiempo);
    this.codigoIntervencion.setValue(cq_codiqx);
    this.personales$ = this.programacionDeSalasServices.getPersonales();
  }

  setAsignacionCirujano(codigoMedico: string) {
    this.cirujano.reset(codigoMedico);
  }

  agregarEquipoMedico(checked: boolean, { value }) {
    checked &&
      this.equiposMedicos.push(this.fb.group({ codigo: value, estado: 1 }));
    !checked && this.deleteEquiposMedicos(value);
  }

  deleteEquiposMedicos(codigoDeEquipoMedico: any) {
    const indice = this.equiposMedicos.value.findIndex(
      ({ codigo }) => codigo === codigoDeEquipoMedico
    );
    this.equiposMedicos.removeAt(indice);
  }

  chanceCheckbox(checked: boolean, { control, value }) {
    checked && this.form.addControl(control, new FormControl(value));
    !checked && this.form.removeControl(control);
  }

  acordionSala(checked: boolean, numeroDeSala: string) {
    this.sala = checked;
    this.salas$ = this.programacionDeSalasServices.getSalas();
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
