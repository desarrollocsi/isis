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
} from './db/db';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    });

    this.values$ = this.searchData();
    this.especialidades$ = of(especialidades);
    this.camas$ = of(camas);
    this.anestesias$ = of(anestesia);
  }

  // buscar() {
  //   // this.values$ = this.search$.pipe(
  //   //   debounceTime(800),
  //   //   map((val: number) => this.searchData(val))
  //   // );
  // }

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

  // searchData(historia: number) {
  //   return data.filter((value: any) => value.historia === +historia);
  // }

  onSubmit() {
    console.log(this.form.value);
  }
}
