import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IntermedaryService, MessageService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services';

import {
  obtenerIndice,
  modificarDataDeProgramacionDeSalas,
  formatearFecha,
  transformarData,
} from '../utils/util';

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
  salas$: Observable<any>;
  form$: Observable<any>;
  form: FormGroup;
  disponibilidadDeSalas$: Observable<any>;
  sala: boolean = false;
  isPanelTiempoProgramacion: boolean = false;
  nameButton: string = 'Registrar';
  verbo: string = 'POST';

  private readonly unsubscribe$: Subject<void> = new Subject();

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

  constructor(
    private fb: FormBuilder,
    private programacionDeSalasServices: ProgramaciondesalasService,
    private IntermedaryService: IntermedaryService,
    private MessageService: MessageService,
    private Router: Router
  ) {}

  intervencion = new FormControl({ value: null, disabled: true });

  ngOnInit(): void {
    this.form = this.fb.group({
      sa_codsal: [{ value: null, disabled: true }],
      cq_cama: [null],
      se_codigo: [null],
      cq_numhis: ['100000'],
      medico: [{ value: null, disabled: true }],
      cq_codiqx: [{ value: null, disabled: true }],
      cq_codiqx2: [{ value: null, disabled: true }],
      cq_codiqx3: [{ value: null, disabled: true }],
      an_tipane: [null],
      cq_num_petito: [null],
      cq_numsema: [null],
      tiempo: [{ value: null, disabled: true }],
      cq_antibio: [null],
      cq_areapre: [null],
      cq_estancia: [null],
      cq_pedido: [null],
      cq_fecha: [{ value: null, disabled: true }],
      cq_hoinpr: [{ value: null, disabled: true }],
      cq_hofipr: [{ value: null, disabled: true }],
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
    this.salas$ = this.programacionDeSalasServices.getSalas();
    this.getProgramacionData();
    this.fechaCalendario();
    this.horarioDeProgramacion();
    this.httpDynamic();
  }

  httpDynamic() {
    this.programacionDeSalasServices.httpDynamic
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ({ verbo, nameButton }: { verbo: string; nameButton: string }) => {
          this.nameButton = nameButton;
          this.verbo = verbo;
        }
      );
  }

  camposReset() {
    this.intervencion.reset({ value: null, disabled: false });
    this.forms.cq_codiqx.reset({ value: null, disabled: false });
    this.forms.cq_codiqx2.reset({ value: null, disabled: false });
    this.forms.cq_codiqx3.reset({ value: null, disabled: false });
    this.forms.medico.reset({ value: null, disabled: false });
  }

  horarioDeProgramacion() {
    this.programacionDeSalasServices.dataHorarioDeProgramacion
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue(data), (this.isPanelTiempoProgramacion = true);
      });
  }

  panelTiempoProgramacion() {
    this.forms.tiempo.value &&
      this.IntermedaryService.modal.next(this.forms.tiempo.value);

    !this.forms.tiempo.value &&
      this.MessageService.MessageInfo('Ingresar intervencion');
  }

  fechaCalendario() {
    this.IntermedaryService._fecha
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fecha: string) => {
        this.forms.cq_fecha.setValue(formatearFecha(fecha));
      });
  }

  getProgramacionData() {
    this.IntermedaryService._dataDeProgramacionDeSalas
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue(modificarDataDeProgramacionDeSalas(data));
        data.participantes.map((data: any) =>
          this.participantes.push(this.fb.group(data))
        );
        this.camposReset();
        this.personales$ = this.programacionDeSalasServices.getPersonales();
      });
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
    this.participantes.clear();
    const { cq_codiqx, cq_tiempo } = JSON.parse(data);
    this.tiempoDeIntervencion.reset(cq_tiempo);
    this.codigoIntervencion.setValue(cq_codiqx);
    this.listadoDeParticipantes(cq_codiqx);
  }

  listadoDeParticipantes(codigoDeIntervencion: string) {
    this.programacionDeSalasServices
      .getParticipantes(codigoDeIntervencion)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        data.map((val: any) => {
          val['pl_codper'] = null;
          this.participantes.push(this.fb.group(val));
        });
      });
    this.personales$ = this.programacionDeSalasServices.getPersonales();
  }

  setAsignacionCirujano(codigoMedico: string) {
    this.cirujano.reset({ value: codigoMedico, disabled: true });
  }

  agregarEquipoMedico(checked: boolean, { value }) {
    checked && this.equiposMedicos.push(this.fb.group({ de_codequi: value }));
    !checked && this.deleteEquiposMedicos(value);
  }

  deleteEquiposMedicos(codigoDeEquipoMedico: any) {
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
        (data: any) => {
          this.MessageService.MessageSucces(data.message),
            this.Router.navigate(['home/programaciondesalas']);
        },
        (error: any) => this.MessageService.MessageError(error)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
