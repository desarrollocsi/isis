import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { concatAll, filter, switchMap, take } from 'rxjs/operators';

import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services';

import * as moment from 'moment';

@Component({
  selector: 'app-programaciondesalas-registrado',
  templateUrl: './programaciondesalas-registrado.component.html',
  styleUrls: ['./programaciondesalas-registrado.component.css'],
})
export class ProgramaciondesalasRegistradoComponent
  implements OnInit, OnDestroy
{
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
    return this.form.get('cq_codiqx');
  }

  get participantesData() {
    return this.participantes.value;
  }

  get forms() {
    return this.form.controls;
  }

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService,
    private IntermedaryService: IntermedaryService
  ) {}

  intervencion = new FormControl({ value: null, disabled: true });

  ngOnInit(): void {
    this.form = this.fb.group({
      sa_codsal: [null],
      cq_cama: [null],
      se_codigo: [null],
      cq_numhis: ['100000'],
      medico: [{ value: null, disabled: true }],
      // cq_codiqx: [{ value: null, disabled: true }],
      // cq_codiqx2: [{ value: null, disabled: true }],
      // cq_codiqx3: [{ value: null, disabled: true }],
      cq_codiqx: [null],
      cq_codiqx2: [null],
      cq_codiqx3: [null],
      an_tipane: [null],
      cq_num_petito: [null],
      cq_numsema: [null],
      tiempo: [null],
      cq_antibio: [null],
      cq_areapre: [null],
      cq_estancia: [null],
      cq_pedido: [null],
      cq_fecha: [null],
      cq_hoinpr: [null],
      cq_hofipr: [null],
      // cq_es_emer: [null],
      // cq_orden_rqx: [null],
      // cq_orden_cq: [null],
      // cq_enfer: [null],
      participantes: this.fb.array([]),
      equiposMedicos: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
    this.form$ = this.programacionDeSalasServices.getFormDynamic();
    this.getProgramacionData();
    this.IntermedaryService._fecha.subscribe((fecha: string) => {
      this.forms.cq_fecha.setValue(moment(fecha).format('YYYY-MM-DD HH:mm:ss'));
    });
  }

  getProgramacionData() {
    this.IntermedaryService._codigoProgramacion
      .pipe(
        take(1),
        filter((codigoDeProgramacion: string) => codigoDeProgramacion !== ''),
        switchMap((codigoDeProgramacion: string) =>
          this.programacionDeSalasServices.getProgramacionDeSalas(
            codigoDeProgramacion
          )
        )
      )
      .subscribe((data: any) => {
        this.personales$ = this.programacionDeSalasServices.getPersonales();
        data.participantes.map((data: any) => {
          this.participantes.push(this.fb.group(data));
        });
        this.form.patchValue(data);
        //this.camposReset();
      });
  }

  camposReset() {
    this.intervencion.reset({ value: null, disabled: false });
    this.forms.cq_codiqx.reset({ value: null, disabled: false });
    this.forms.cq_codiqx2.reset({ value: null, disabled: false });
    this.forms.cq_codiqx3.reset({ value: null, disabled: false });
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
    checked && this.equiposMedicos.push(this.fb.group({ de_codequi: value }));
    !checked && this.deleteEquiposMedicos(value);
  }

  deleteEquiposMedicos(codigoDeEquipoMedico: any) {
    const indice = this.equiposMedicos.value.findIndex(
      ({ codigo }) => codigo === codigoDeEquipoMedico
    );
    this.equiposMedicos.removeAt(indice);
  }

  chanceCheckbox(checked: boolean, { control, value }) {
    console.log(checked);
    checked && this.form.addControl(control, new FormControl(value));
    !checked && this.form.removeControl(control);
  }

  acordionSala(checked: any, numeroDeSala: string) {
    const salas = checked.target.value;
    const isChecked = checked.target.checked;

    this.sala = isChecked;
    // this.salas$ = this.programacionDeSalasServices.getSalas(
    //   moment(this.forms.cq_fecha.value).format('YYYY-MM-DD'),
    //   numeroDeSala
    // );
    // this.forms.sa_codsal.setValue(numeroDeSala);
  }

  setTiempo({ hora }) {
    this.forms.cq_hoinpr.setValue(hora);

    const fechaHoraInicio = moment(
      `2021-09-08 ${hora}`,
      'YYYY-MM-DD HH:mm:ss'
    ).format('YYYY-MM-DD HH:mm:ss');
    const fechaHoraFin = moment(fechaHoraInicio)
      .add(this.forms.tiempo.value, 'm')
      .format('YYYY-MM-DD HH:mm:ss');
    this.form.patchValue({
      cq_hoinpr: fechaHoraInicio,
      cq_hofipr: fechaHoraFin,
    });
  }

  onSubmit() {
    // this.programacionDeSalasServices
    //   .postRegistroDeProgramacion(this.form.value)
    //   .subscribe(console.log);
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
