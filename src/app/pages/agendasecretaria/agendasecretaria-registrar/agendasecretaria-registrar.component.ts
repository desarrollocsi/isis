import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AgendasecretariaService } from '../services/agendasecretaria.service';
import { AuthStorageService, ToasterService } from '../../../core/services';

import * as moment from 'moment';

@Component({
  selector: 'app-agendasecretaria-registrar',
  templateUrl: './agendasecretaria-registrar.component.html',
  styleUrls: ['./agendasecretaria-registrar.component.css'],
})
export class AgendasecretariaRegistrarComponent implements OnInit, OnDestroy {
  form: FormGroup;

  search = new Subject<string>();
  _search = this.search.asObservable();

  pacienteSeleccionado = new Subject<any>();
  _pacienteSeleccionado = this.pacienteSeleccionado.asObservable();

  search$: Observable<any>;
  agendaMedicaData$: Observable<any>;
  paciente$: Observable<any>;
  acreditaciones$: Observable<any>;
  statusSearch: boolean = false;
  statusDatosPaciente: boolean = false;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private AGS: AgendasecretariaService,
    private AS: AuthStorageService,
    private TS: ToasterService
  ) {}

  getValue(target: EventTarget): string {
    return (target as HTMLInputElement).value;
  }

  setSearch(search: string) {
    this.search.next(search);
  }

  get usuario() {
    return this.AS.User;
  }

  get campos() {
    return this.form.controls;
  }

  searchinput = new FormControl(null);
  checkbox = new FormControl(false);

  ngOnInit(): void {
    this.form = this.fb.group({
      ci_cuenta: [' '],
      ci_numhist: [null],
      ci_fechacita: [null],
      ci_programacion: [null],
      ci_orden: [null],
      ci_horatencion: [null],
      ci_observaciones: [null],
      ci_edad: [null],
      ci_tipopac: [null],
      ci_tipomov: ['111'],
      ci_actividad: [null],
      ci_usersisa: [this.usuario],
    });
    this.onDataProgramacion();
    this.onDataCupos();
    this.onSearch();
    this.getPacienteSeleccionado();
    this.modal();
  }

  modal() {
    this.AGS._modal2
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => this.formReset());
  }

  formReset() {
    this.campos.ci_tipomov.reset('111');
    this.campos.ci_usersisa.reset(this.usuario);
    this.campos.ci_tipopac.reset();
    this.campos.ci_observaciones.reset();
    this.searchinput.reset();
    this.statusDatosPaciente = false;
    this.statusSearch = false;
  }

  selectChecked(event: any) {
    if (this.checkbox.value) {
      this.campos.ci_tipomov.reset(event.value);
      return;
    }
    this.campos.ci_tipomov.reset('111');
  }

  onDataProgramacion() {
    this.agendaMedicaData$ = this.AGS.getDataProgramacion().pipe(
      tap((data: any) => this.campos.ci_programacion.setValue(data.id))
    );
  }

  onDataCupos() {
    this.AGS._dataCupo.subscribe((data: any) => {
      this.campos.ci_orden.reset(data.orden);
      this.campos.ci_horatencion.reset(data.hora);
      this.campos.ci_fechacita.reset(
        moment(data.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00')
      );
    });
  }

  onSearch() {
    this.search$ = this._search.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((search: string) => this.AGS.getBuscarPaciente(search)),
      map((data: any) =>
        data.sort((a: any, b: any) => (a.paciente > b.paciente ? 1 : -1))
      ),
      tap((_) => (this.statusSearch = true))
    );
  }

  seleccionarPaciente(data: any) {
    this.campos.ci_numhist.setValue(data.historia);
    this.campos.ci_edad.setValue(data.edad);
    this.getAcreditacion(data.historia);
    this.pacienteSeleccionado.next(data);
  }

  getPacienteSeleccionado() {
    this.paciente$ = this._pacienteSeleccionado.pipe(
      tap((_) => {
        this.statusSearch = false;
        this.statusDatosPaciente = true;
      })
    );
  }

  getAcreditacion(historia: string) {
    this.acreditaciones$ = this.AGS.getAcreditacion(historia);
  }

  onSubmit() {
    this.AGS.setModal(false);
    this.AGS.postGenerarCita(this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) =>
        this.TS.show('success', 'Bien hecho!', data.message)
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
