import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  data,
  especialidades,
  camas,
  medicos,
  intervenciones,
  anestesia,
  participantes,
} from './db/db';

@Component({
  selector: 'app-programaciondesalas',
  templateUrl: './programaciondesalas.component.html',
  styleUrls: ['./programaciondesalas.component.css'],
})
export class ProgramaciondesalasComponent implements OnInit {
  private search$: Subject<number> = new Subject<number>();
  public values$: Observable<any>;
  public data$: Observable<any>;
  public especialidades$: Observable<any>;
  public camas$: Observable<any>;
  public medicos$: Observable<any>;
  public intervenciones$: Observable<any>;
  public anestesias$: Observable<any>;
  isSearch: boolean = false;
  form: FormGroup;
  // participantes: FormArray;

  get participantes(): FormArray {
    return this.form.get('participantes') as FormArray;
  }

  get cirujano() {
    return this.participantes.at(0).get('descripcionPersonal');
  }

  get tiempoDeIntervencio() {
    return this.form.get('tiempo');
  }

  constructor(private fb: FormBuilder) {}

  search(value: number) {
    this.search$.next(value);
  }

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

    this.values$ = this.searchData();
    this.especialidades$ = of(especialidades);
    this.camas$ = of(camas);
    this.anestesias$ = of(anestesia);
  }

  searchData() {
    return of(data);
  }

  onSearch(isSearch: boolean = true) {
    this.isSearch = isSearch;
  }

  seleccionarPaciente(data: any) {
    data && this.onSearch(false);
    this.data$ = of(data);
  }

  changeMedicoIntervecion(codigo: string) {
    this.getMedicos(codigo);
    this.getIntervencion(codigo);
  }

  setAsignacionCirujano(codigo: string) {
    this.cirujano.reset({ value: codigo, disabled: true });
  }

  getIntervencion(codigo: string) {
    this.intervenciones$ = of(intervenciones).pipe(
      map((value: any) =>
        value.filter((value: any) => value.codigoEspecialidad === codigo)
      )
    );
  }

  getMedicos(codigo: string) {
    this.medicos$ = of(medicos).pipe(
      map((value: any) =>
        value.filter((value: any) => value.codigoEspecialidad === codigo)
      )
    );
  }

  getParticipantes(codigo: string) {
    return participantes.filter((val: any) => val.codigo === codigo);
  }

  setParticipantes(data: any) {
    const { codigo, tiempo } = JSON.parse(data);
    this.participantes.clear();
    const form = this.getParticipantes(codigo);
    form.map((val) => {
      Object.assign(val, { descripcionPersonal: null });
      this.participantes.push(this.fb.group(val));
    });

    this.tiempoDeIntervencio.reset({ value: tiempo, disabled: true });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
