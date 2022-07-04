import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { ActomedicoService } from './services/actomedico.service';

import {
  HttpService,
  IntermedaryService,
  MessageService,
  AuthStorageService,
} from '../../core/services';

import swal from 'sweetalert2';
@Component({
  selector: 'app-actomedico',
  templateUrl: './actomedico.component.html',
  styleUrls: ['./actomedico.component.css'],
})
export class ActomedicoComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private AMS: ActomedicoService,
    private http: HttpService,
    private IS: IntermedaryService,
    private MS: MessageService,
    private router: Router,
    private AU: AuthStorageService
  ) {}
  formActoMedico: FormGroup;
  cies$: Observable<any>;
  antecedentes$: Observable<any>;
  cieSelect$: Observable<any>;
  datosDelPaciente$: Observable<any>;
  search$ = new Subject<string>();
  antecedentes: any;
  diagnosticos: any;
  medicamentos: any;
  procedimientos: any;
  visible = true;
  p: number = 1;
  VERB_HTTP: string = 'POST';
  tituloBoton: string = 'Registrar';

  nameSearch: string;

  examples1: [] = [];
  examples2: [] = [];

  private readonly unsubscribe$: Subject<void> = new Subject();
  get usuario() {
    return this.AU.User;
  }

  searchs = new FormControl(null);

  ngOnInit(): void {
    this.formActoMedico = this.fb.group({
      id: [null, Validators.required],
      idcita: [null],
      motivo: [null],
      problema: [null],
      examen: [null],
      parterial: [null],
      fcardiaca: [null],
      frespiratoria: [null],
      tbucal: [null],
      taxiliar: [null],
      peso: [null],
      talla: [null],
      icorporal: [null],
      pcefalico: [null],
      destino: [null],
      antecedentes: this.fb.array([]),
      diagnosticos: this.fb.array([]),
      procedimientos: this.fb.array([]),
      medicamentos: this.fb.array([]),
      usuario: [this.usuario],
    });

    this.antecedentes$ = this.http.getAntecedentes();
    this.antecedentes = this.formActoMedico.get('antecedentes') as FormArray;
    this.diagnosticos = this.formActoMedico.get('diagnosticos') as FormArray;

    this.procedimientos = this.formActoMedico.get(
      'procedimientos'
    ) as FormArray;
    this.medicamentos = this.formActoMedico.get('medicamentos') as FormArray;

    this.getDataActoMedico();
    this.getCie();
    this.calculoDeImc();
    this.getDatoDelPaciente();
  }

  get peso() {
    return this.formActoMedico.get('peso').valueChanges;
  }

  get talla() {
    return this.formActoMedico.get('talla').valueChanges;
  }

  get form() {
    return this.formActoMedico.controls;
  }

  getDatoDelPaciente() {
    this.datosDelPaciente$ = this.IS._datoDePaciente.pipe(
      tap((data: any) => this.form.idcita.setValue(data.id))
    );
  }

  getDataActoMedico() {
    this.IS._dataActoMedico
      .pipe(
        tap((_) => {
          this.VERB_HTTP = 'PUT';
          this.tituloBoton = 'Actualizar';
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data) => {
        this.formActoMedico.patchValue(data);
        this.setAntecedentes(data.antecedentes);
        this.setCieX(data.diagnosticos);
      });
  }

  setAntecedentes(data: any) {
    data.map((val: any) => {
      Object.assign(val, { id: 0 });
      const group = this.fb.group(val);
      this.antecedentes.push(group);
    });
  }

  setCieX(data: any) {
    data.map((val: any) => {
      this.agregarCieX(val, false);
    });
  }

  calculoDeImc() {
    combineLatest([this.peso, this.talla])
      .pipe(
        takeUntil(this.unsubscribe$),
        map(([peso, talla]) => (peso / (talla * talla)).toFixed(2))
      )
      .subscribe((data) => this.formActoMedico.patchValue({ icorporal: data }));
  }

  search(search: any) {
    this.search$.next(search.value);
  }

  getCie() {
    this.cies$ = this.search$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((data: any) => this.AMS.getCie(data)),
      tap((_) => (this.visible = true))
    );
  }

  agregarAntecedentes() {
    const form = { idan: [null], valor: [null] };
    const group = this.fb.group(form);
    this.antecedentes.push(group);
  }

  agregarCieX(data: any, nuevo = true) {
    if (this.validacionAddcie(data)) {
      swal.fire('', 'Ya selecciono el Cie-X', 'info');
      return;
    }
    this.diagnosticos.push(this.ValidacionUpdate(data, nuevo));
    this.visible = false;
  }

  ValidacionUpdate(data: any, nuevo: boolean) {
    Object.assign(data, { idcie: data.id });
    if (this.VERB_HTTP === 'PUT' && nuevo) {
      Object.seal(data);
      data.id = 0;
    }
    return this.fb.group(data);
  }

  validacionAddcie(data: any) {
    return this.diagnosticos.value.some(
      (val: any) => val.codigo === data.codigo
    );
  }

  deleteAntecedente(indice: number) {
    this.antecedentes.removeAt(indice);
  }

  deleteCie(indice: number) {
    this.diagnosticos.removeAt(indice);
  }

  updateCie(event: any, indice: number) {
    this.diagnosticos.at(indice).value.tdx = event.target.value;
  }

  onSubmit() {
    if (this.formActoMedico.invalid) return;

    this.AMS.apidynamic(this.VERB_HTTP, this.formActoMedico.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.MS.MessageInfo(data['message']);
        this.router.navigate(['home/agendamedica']);
      });
  }

  ///////////////////////////////////////////////////////

  _isProcedimiento: boolean = false;
  _isMedicamento: boolean = false;

  set procedimiento(isProcedimiento: boolean) {
    this._isProcedimiento = isProcedimiento;
  }

  set medicamento(isMedicamento: boolean) {
    this._isMedicamento = isMedicamento;
  }

  get procedimiento(): boolean {
    return this._isProcedimiento;
  }

  get medicamento(): boolean {
    return this._isMedicamento;
  }

  agregarConsumos(keyName: string = 'PROCEDIMIENTO') {
    const SEARCH__DYNAMIC = {
      MEDICAMENTO: () => {
        this.medicamento = true;
        this.procedimiento = false;
      },
      PROCEDIMIENTO: () => {
        this.procedimiento = true;
        this.medicamento = false;
      },
    };

    this.nameSearch = keyName;
    SEARCH__DYNAMIC[keyName]();
  }

  selectItem({ key, data }) {
    const PUSH__DYNAMIC = {
      PROCEDIMIENTO: () => this.procedimientos.push(this.fb.group(data)),
      MEDICAMENTO: () => this.medicamentos.push(this.fb.group(data)),
    };

    PUSH__DYNAMIC[key]();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
