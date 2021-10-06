import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services/';
import { formDynamic } from '../db/form__dynamic';

interface Gasas {
  value: string;
}

@Component({
  selector: 'app-programaciondesalas-informeoperatioro',
  templateUrl: './programaciondesalas-informeoperatioro.component.html',
  styleUrls: ['./programaciondesalas-informeoperatioro.component.css'],
})
export class ProgramaciondesalasInformeoperatioroComponent implements OnInit {
  programacionSalas$: Observable<any>;
  radioDynamic$: Observable<any>;
  form: FormGroup;
  search$ = new Subject<string>();
  searchCie$: Observable<any>;

  get gasas() {
    return this.form.get('cq_contgas');
  }

  constructor(
    private fb: FormBuilder,
    private IntermedaryService: IntermedaryService,
    private ProgramaciondesalasService: ProgramaciondesalasService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sa_codsal: [null],
      cq_numope: [null],
      cq_diag_procedimientos: [null],
      cq_diag_hallazgos: [null],
      cq_diag_complicaciones: [null],
      cq_diag_pre_ope: [null],
      cq_diag_pos_ope: [null],
      cq_patolo: [null],
      cq_diag_sang_aprox: [null],
      cq_contgas: [null],
    });

    this.dataDeProgramacionDeSalas();
    this.radioDynamic();
    this.searchCie();
  }

  radioDynamic() {
    this.radioDynamic$ = of(formDynamic.gasas);
  }

  dataDeProgramacionDeSalas() {
    this.programacionSalas$ =
      this.IntermedaryService._dataDeProgramacionDeSalas.pipe(
        tap((data) => this.patch(data))
      );
  }

  patch({ sa_codsal, cq_numope }): void {
    this.form.patchValue({ sa_codsal, cq_numope });
  }

  search({ value }) {
    this.search$.next(value);
  }

  searchCie() {
    this.searchCie$ = this.search$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((search: string) =>
        this.ProgramaciondesalasService.getSearchCie(search)
      )
    );
  }

  selectCie({ codigo, descripcion }, event: any) {
    console.log(event);
    const data = `${codigo} - ${descripcion}`;
    this.form.get('cq_diag_pre_ope').setValue(data);
  }

  onSubmit() {
    this.ProgramaciondesalasService.postInformeOperatorio(
      this.form.value
    ).subscribe(console.log);
  }
}
