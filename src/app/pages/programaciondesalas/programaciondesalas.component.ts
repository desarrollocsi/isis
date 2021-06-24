import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  find,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  data,
  especialidades,
  camas,
  medicos,
  intervenciones,
  anestesia,
  participantes,
} from './db/db';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  participantes: FormArray;

  constructor(private fb: FormBuilder) {}

  search(value: number) {
    this.search$.next(value);
  }

  dataForm = [
    {
      name: 'action_modal',
      value: 'add',
    },
    {
      name: 'id_modal',
      value: '0',
    },
    {
      name: 'grado_academico',
      value: '1',
    },
    {
      name: 'estudio_peru',
      value: '0',
    },
    {
      name: 'regimen',
      value: '1',
    },
    {
      name: 'institucion_tipo',
      value: '1',
    },
    {
      name: 'institucion_nombre',
      value: 'saf',
    },
    {
      name: 'estudio_realizado',
      value: 'dsfds',
    },
    {
      name: 'nro_colegiatura',
      value: '1',
    },
    {
      name: 'fecha_inicio',
      value: '2021-06-18',
    },
    {
      name: 'fecha_termino',
      value: '',
    },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      cama: [null],
      especialidad: [null],
      medico: [null],
      intervencion: [null],
      anestesia: [null],
      participantes: this.fb.array([]),
    });

    this.values$ = this.searchData();
    this.especialidades$ = of(especialidades);
    this.camas$ = of(camas);
    this.anestesias$ = of(anestesia);
    this.participantes = this.form.get('participantes') as FormArray;
    this.crearObject();
  }

  // buscar() {
  //   // this.values$ = this.search$.pipe(
  //   //   debounceTime(800),
  //   //   map((val: number) => this.searchData(val))
  //   // );
  // }

  crearObject() {
    const object = {};
    this.dataForm.map(({ name, value }) => (object[name] = value || ''));
    console.log(object);
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

  setParticipantes(codigo: string) {
    this.participantes.clear();
    const form = this.getParticipantes(codigo);
    form.map((val) => {
      Object.assign(val, { descripcionPersonal: null });
      this.participantes.push(this.fb.group(val));
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
