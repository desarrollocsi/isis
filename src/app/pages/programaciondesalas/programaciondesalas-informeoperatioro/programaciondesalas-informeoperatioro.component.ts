import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IntermedaryService, MessageService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services/';
import { formDynamic } from '../db/form__dynamic';

@Component({
  selector: 'app-programaciondesalas-informeoperatioro',
  templateUrl: './programaciondesalas-informeoperatioro.component.html',
  styleUrls: ['./programaciondesalas-informeoperatioro.component.css'],
})
export class ProgramaciondesalasInformeoperatioroComponent
  implements OnInit, OnDestroy
{
  programacionSalas$: Observable<any>;
  radioDynamic$: Observable<any>;
  form: FormGroup;
  search$ = new Subject<any>();
  searchCie$: Observable<any>;
  control: string;
  verbo: string = 'POST';
  submit: Boolean = false;
  private readonly unsubscribe$: Subject<void> = new Subject();
  get gasas() {
    return this.form.get('cq_contgas');
  }

  get diagnosticosPre() {
    return this.control === 'cq_diag_pre_ope';
  }

  get diagnosticosPos() {
    return this.control === 'cq_diag_pos_ope';
  }

  get cq_contgas() {
    return this.form.get('cq_contgas');
  }

  constructor(
    private fb: FormBuilder,
    private IntermedaryService: IntermedaryService,
    private ProgramaciondesalasService: ProgramaciondesalasService,
    private MessageService: MessageService
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
      cq_contgas: [null, [Validators.required]],
    });

    this.dataDeProgramacionDeSalas();
    this.radioDynamic();
    this.searchCie();
    this.getDataInformenOperatoio();
    this.ProgramaciondesalasService.closeSearch.subscribe(
      (isClose: Boolean) => (this.control = '')
    );
  }

  radioDynamic() {
    this.radioDynamic$ = of(formDynamic.gasas);
  }

  getDataInformenOperatoio() {
    this.ProgramaciondesalasService.__dataInformenOperatorio$
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((codigo: string) =>
          this.ProgramaciondesalasService.getInformenOperatorio(codigo)
        )
      )
      .subscribe((data) => {
        this.form.patchValue(data);
        this.verbo = 'PUT';
      });
  }

  dataDeProgramacionDeSalas() {
    this.programacionSalas$ =
      this.IntermedaryService._dataDeProgramacionDeSalas.pipe(
        tap(({ sa_codsal, cq_numope }) =>
          this.form.patchValue({ sa_codsal, cq_numope })
        )
      );
  }

  search(event: any) {
    (this.control = event.attributes[2].value), this.search$.next(event.value);
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

  onSelectCie(value: string) {
    this.form.get(this.control).setValue(value);
  }

  onSubmit() {
    this.submit = true;
    if (this.form.invalid) return;

    this.ProgramaciondesalasService.InformeOperatorio(
      this.form.value,
      this.verbo
    ).subscribe(
      (data: any) => this.action(data),
      (error: any) => this.MessageService.MessageInfo(error)
    );
  }

  action({ message }: { message: string }) {
    this.MessageService.MessageSucces(message);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
