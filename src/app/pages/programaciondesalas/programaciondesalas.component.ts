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
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  FORM_DYNAMIC = [
    {
      name: 'prueba1',
      type: 'text',
      value: 'prueba',
      rules: {
        required: true,
        minLength: 10,
      },
    },
    {
      name: 'prueba2',
      type: 'text',
      value: 'prueba',
      rules: {
        required: true,
      },
    },
    {
      name: 'prueba3',
      type: 'text',
      value: 'prueba',
      rules: {
        required: false,
      },
    },
    {
      name: 'prueba4',
      type: 'text',
      value: null,
      rules: { required: false },
    },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      cama: [null, [Validators.required, Validators.minLength(4)]],
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

    this.formDynamic();
    console.log(this.form);
  }

  formDynamic() {
    this.FORM_DYNAMIC.map(({ name, value, rules }) => {
      this.form.addControl(
        name,
        this.fb.control(value, this.validatorsDynamic({ rules }))
      );
    });
  }
  validatorsDynamic({ rules }) {
    const VALIDATOR_DYNAMIC = {
      required: Validators.required,
      minLength: Validators.minLength(10),
    };
    return Object.entries(rules).map(([key]) => VALIDATOR_DYNAMIC[key]);
  }

  // buscar() {
  //   // this.values$ = this.search$.pipe(
  //   //   debounceTime(800),
  //   //   map((val: number) => this.searchData(val))
  //   // );
  // }

  crearObject() {
    // const object = {};
    // this.dataForm.map(({ name, value }) => (object[name] = value || ''));
    // const key = 'item';
    // const formKey = 'form';
    // this.dataObject[formKey][key].push('prueba1');
    // this.dataObject[formKey][key].push('prueba2');
    // console.log(this.dataObject);
    // console.log(this.dataObject[formKey]);
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
