import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IntermedaryService, MessageService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services';

import {
  obtenerIndice,
  modificarDataDeProgramacionDeSalas,
  formatearFechaYmd,
  transformarData,
  isCheckbox,
} from '../utils/util';

@Component({
  selector: 'app-programaciondesalas-registrado',
  templateUrl: './programaciondesalas-registrado.component.html',
  styleUrls: ['./programaciondesalas-registrado.component.css'],
})
export class ProgramaciondesalasRegistradoComponent
  implements OnInit, OnDestroy
{
  private readonly unsubscribe$: Subject<void> = new Subject();
  disponibilidadDeSalas$: Observable<any>;
  camas$: Observable<any>;
  especialidades$: Observable<any>;
  intervenciones$: Observable<any>;
  medicos$: Observable<any>;
  personales$: Observable<any>;
  anestesias$: Observable<any>;
  salas$: Observable<any>;
  form$: Observable<any>;
  form: FormGroup;
  nameButton: string = 'Registrar';
  verbo: string = 'POST';
  sala: boolean = false;
  isPanelTiempoProgramacion: boolean = false;
  formDynamics: any;

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

  get forms() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService,
    private IntermedaryService: IntermedaryService,
    private MessageService: MessageService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cq_numope: [null],
      sa_codsal: [{ value: null, disabled: true }],
      cq_cama: [null, Validators.required],
      se_codigo: [null],
      cq_numhis: [null],
      cq_paciente: [null],
      cq_edad: [null],
      medico: [{ value: null, disabled: true }],
      cq_codiqx: [{ value: null, disabled: true }],
      cq_codiqx2: [{ value: null, disabled: true }],
      cq_codiqx3: [{ value: null, disabled: true }],
      an_tipane: [null],
      cq_num_petito: [null, [Validators.required, Validators.minLength(2)]],
      cq_numsema: [null],
      tiempo: [{ value: null, disabled: true }],
      cq_antibio: [null],
      cq_areapre: [null],
      cq_estancia: [null],
      cq_pedido: [null],
      cq_fecha: [{ value: null, disabled: true }],
      cq_hoinpr: [{ value: null, disabled: true }],
      cq_hofipr: [{ value: null, disabled: true }],
      participantes: this.fb.array([]),
      equiposMedicos: this.fb.array([]),
    });

    this.camas$ = this.programacionDeSalasServices.getCamas();
    this.especialidades$ = this.programacionDeSalasServices.getEspecialidades();
    this.anestesias$ = this.programacionDeSalasServices.getAnestesia();
    this.form$ = this.programacionDeSalasServices.getFormDynamic();
    this.salas$ = this.programacionDeSalasServices.getSalas();
    this.getProgramacionData();
    this.fechaCalendario();
    this.horarioDeProgramacion();
    this.httpDynamic();
    this.datosDelPaciente();
    this.formDynamic();
  }

  Personal() {
    this.personales$ = this.programacionDeSalasServices.getPersonales();
  }

  formDynamic() {
    this.programacionDeSalasServices.getFormDynamic().subscribe((data: any) => {
      this.formDynamics = data;
    });
  }

  camposReset() {
    this.forms.cq_codiqx.reset({ value: null, disabled: false });
    this.forms.cq_codiqx2.reset({ value: null, disabled: false });
    this.forms.cq_codiqx3.reset({ value: null, disabled: false });
    this.forms.medico.reset({ value: null, disabled: false });
  }

  datosDelPaciente() {
    this.programacionDeSalasServices.datoDelpaciente.subscribe((data: any) => {
      this.form.patchValue(data);
    });
  }

  httpDynamic() {
    this.programacionDeSalasServices.httpDynamic
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ verbo, nameButton }) => {
        this.nameButton = nameButton;
        this.verbo = verbo;
      });
  }

  horarioDeProgramacion() {
    this.programacionDeSalasServices.dataHorarioDeProgramacion
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue(data), (this.isPanelTiempoProgramacion = true);
      });
  }

  tiempoProgramacion() {
    !this.forms.tiempo.value &&
      this.MessageService.MessageInfo('Ingresar intervencion');

    this.forms.tiempo.value &&
      this.IntermedaryService.modal.next(this.forms.tiempo.value);
  }

  fechaCalendario() {
    this.IntermedaryService._fecha
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fecha: string) =>
        this.forms.cq_fecha.setValue(formatearFechaYmd(fecha))
      );
  }

  getProgramacionData() {
    this.IntermedaryService._dataDeProgramacionDeSalas
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.changeMedicoIntervecion(data.se_codigo);
        this.form.patchValue(modificarDataDeProgramacionDeSalas(data));
        data.participantes.map((data: any) =>
          this.participantes.push(this.fb.group(data))
        );
        this.setTiempoDeIntervencion(data.cq_codiqx);
        this.setAsignacionCirujano(this.cirujano.value, true);
        this.isPanelTiempoProgramacion = true;
        this.Personal();
        data.equiposMedicos.map(({ de_codequi }) => {
          this.agregarEquipoMedico(true, { value: de_codequi });
          isCheckbox('equipoMedicos', de_codequi);
        });

        const { cq_es_emer, cq_orden_rqx, cq_orden_cq, cq_enfer } = data;

        this.formDynamics['otros'][0]['isChecked'] = this.test(cq_es_emer);
        this.formDynamics['otros'][1]['isChecked'] = this.test(cq_orden_rqx);
        this.formDynamics['otros'][2]['isChecked'] = this.test(cq_orden_cq);
        this.formDynamics['otros'][3]['isChecked'] = this.test(cq_enfer);

        this.formDynamics['otros'].map(({ value, control }) => {
          this.chanceCheckbox(true, { value, control });
        });
      });
  }

  test(value: string) {
    return value === '1' ? true : false;
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
    this.intervenciones$ = this.programacionDeSalasServices.getIntervenciones({
      parametro: codigoDeEspecialidad,
      keys: 'ESPECIALIDAD',
    });
  }

  setTiempoDeIntervencion(codigoDeIntervencion: string) {
    this.programacionDeSalasServices
      .getIntervenciones({ parametro: codigoDeIntervencion, keys: 'CODIGO' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ cq_tiempo }) =>
        this.tiempoDeIntervencion.reset({ value: cq_tiempo, disabled: true })
      );
  }

  setParticipantes(codigoDeIntervencion: string) {
    this.listadoDeParticipantes(codigoDeIntervencion);
    this.setTiempoDeIntervencion(codigoDeIntervencion);
    this.Personal();
  }

  listadoDeParticipantes(codigoDeIntervencion: string) {
    this.participantes.clear();
    this.programacionDeSalasServices
      .getParticipantes(codigoDeIntervencion)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        data.map((val: any) => {
          val['pl_codper'] = null;
          this.participantes.push(this.fb.group(val));
        });
      });
  }

  setAsignacionCirujano(codigoMedico: string, isEdit: boolean = false) {
    this.cirujano.reset({ value: codigoMedico, disabled: true });
    isEdit && this.forms.medico.reset({ value: codigoMedico, disabled: false });
  }

  agregarEquipoMedico(checked: boolean, { value }) {
    checked && this.equiposMedicos.push(this.fb.group({ de_codequi: value }));
    !checked && this.deleteEquiposMedicos(value);
  }

  deleteEquiposMedicos(codigoDeEquipoMedico: string) {
    const indice = obtenerIndice({
      data: this.equiposMedicos.value,
      codigoDeEquipoMedico,
    });
    this.equiposMedicos.removeAt(indice);
  }

  chanceCheckbox(checked: boolean, { control, value }) {
    checked && this.form.addControl(control, new FormControl(value));
    !checked && this.form.removeControl(control);
  }

  onSubmit() {
    this.programacionDeSalasServices
      .getApiDynamic({
        verbo: this.verbo,
        data: transformarData(this.form.getRawValue()),
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => this.actionSuccess(data),
        (error: any) => this.MessageService.MessageError(error)
      );
  }

  actionSuccess({ message }: { message: string }) {
    this.MessageService.MessageSucces(message),
      this.Router.navigate(['home/programaciondesalas']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
