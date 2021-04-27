import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

import { AgendasecretariaService } from '../services/agendasecretaria.service';
import { AuthStorageService } from '../../../core/services';

import * as moment from 'moment';

@Component({
  selector: 'app-agendasecretaria-registrar',
  templateUrl: './agendasecretaria-registrar.component.html',
  styleUrls: ['./agendasecretaria-registrar.component.css'],
})
export class AgendasecretariaRegistrarComponent implements OnInit {
  form: FormGroup;

  search = new Subject<string>();
  _search = this.search.asObservable();

  pacienteSeleccionado = new Subject<any>();
  _pacienteSeleccionado = this.pacienteSeleccionado.asObservable();

  search$: Observable<any>;
  agendaMedicaData$: Observable<any>;
  paciente$: Observable<any>;
  acreditaciones$: Observable<any>;
  status: boolean = false;

  constructor(
    private fb: FormBuilder,
    private AGS: AgendasecretariaService,
    private AS: AuthStorageService
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

  searchInput = new FormControl('');

  ngOnInit(): void {
    this.form = this.fb.group({
      ci_cuenta: [null],
      ci_numhist: [null],
      ci_fechacita: [null],
      ci_programacion: [null],
      ci_orden: [null],
      ci_horatencion: [null],
      ci_observaciones: [null],
      ci_edad: [null],
      ci_tipopac: [null],
      ci_tipomov: [null],
      ci_actividad: [null],
      ci_usersisa: [this.usuario],
    });

    this.onDataProgramacion();
    this.onDataCupos();
    this.onSearch();
    this.getPacienteSeleccionado();
  }

  onDataProgramacion() {
    this.agendaMedicaData$ = this.AGS.getDataProgramacion().pipe(
      tap((data: any) => this.campos.ci_programacion.setValue(data.id))
    );
  }

  onDataCupos() {
    this.AGS._dataCupo.subscribe((data: any) => {
      this.campos.ci_orden.setValue(data.orden);
      this.campos.ci_horatencion.setValue(data.hora);
      this.campos.ci_fechacita.setValue(
        moment(data.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD')
      );
    });
  }

  onSearch() {
    this.search$ = this._search.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((search: string) => this.AGS.getBuscarPaciente(search)),
      tap((_) => (this.status = true))
    );
  }

  seleccionarPaciente(data: any) {
    this.campos.ci_numhist.setValue(data.historia);
    this.getAcreditacion(data.historia);
    this.pacienteSeleccionado.next(data);
  }

  getPacienteSeleccionado() {
    this.paciente$ = this._pacienteSeleccionado.pipe(
      tap((_) => (this.status = false))
    );
  }

  getAcreditacion(historia: string) {
    this.acreditaciones$ = this.AGS.getAcreditacion(historia);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
