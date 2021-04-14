import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { ActomedicoService } from './services/actomedico.service';
import { HttpService } from '../../core/services/http.service';
import { CieForm } from '../../core/models/cie-form.class';
import { IntermedaryService } from '../../core/services/intermedary.service';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-actomedico',
  templateUrl: './actomedico.component.html',
  styleUrls: ['./actomedico.component.css'],
})
export class ActomedicoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private AMS: ActomedicoService,
    private http: HttpService,
    private IS: IntermedaryService,
    private MS: MessageService,
    private router: Router
  ) {}
  formActoMedico: FormGroup;
  cies$: Observable<any>;
  antecedentes$: Observable<any>;
  cieSelect$: Observable<any>;
  datosDelPaciente$: Observable<any>;
  antecedentes: any;
  diagnosticos: any;
  add = [];
  cieSelect = [];
  visible = true;
  p: number = 1;
  testdata = [];
  ngOnInit(): void {
    this.formActoMedico = this.fb.group({
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
      cie: [null],
      destino: [null],
      antecedentes: this.fb.array([]),
      diagnosticos: this.fb.array([]),
    });
    this.antecedentes$ = this.http.getAntecedentes();
    this.antecedentes = this.formActoMedico.get('antecedentes') as FormArray;
    this.diagnosticos = this.formActoMedico.get('diagnosticos') as FormArray;

    this.getDatoDelPaciente();
    this.getCie();
    this.IMC();
  }

  get cie() {
    return this.formActoMedico.get('cie').valueChanges;
  }

  get peso() {
    return this.formActoMedico.get('peso').valueChanges;
  }

  get talla() {
    return this.formActoMedico.get('talla').valueChanges;
  }

  get fam() {
    return this.formActoMedico.controls;
  }

  getDatoDelPaciente() {
    this.datosDelPaciente$ = this.IS._datoDePaciente.pipe(
      tap((data: any) => this.formActoMedico.controls.idcita.setValue(data.id))
    );
  }

  IMC() {
    combineLatest([this.peso, this.talla])
      .pipe(map(([peso, talla]) => Math.round(peso / (talla * talla))))
      .subscribe((data) => this.fam.icorporal.setValue(data));
  }

  getCie() {
    this.cies$ = this.cie.pipe(
      debounceTime(900),
      distinctUntilChanged(),
      switchMap((data: any) => this.AMS.getCie(data)),
      tap((_) => (this.visible = true))
    );
  }

  addBackground() {
    const group = this.fb.group({
      idan: [null],
      valor: [null],
    });
    this.antecedentes.push(group);
  }

  addCie(data: any) {
    if (this.ValidacionCie(data)) {
      console.log('ya tiene registrado');
      return;
    }
    this.cieSelect.push(data);

    const group = this.fb.group({
      idcie: [null],
      tdx: [null],
    });
    this.diagnosticos.push(group);
    this.add.push(new CieForm(data));
    this.visible = false;
  }

  ValidacionCie(data: any) {
    const a = this.cieSelect.filter(
      (cie, index) => cie.codigo[index] === data.codigo
    ).length;
    return a === 2 ? true : false;
  }

  setCie() {
    this.diagnosticos.setValue(this.add);
  }

  onSubmit() {
    this.setCie();
    this.AMS.postActoMedico(this.formActoMedico.value).subscribe((data) => {
      this.MS.MessageInfo(data['message']);
      this.router.navigate(['home/agendamedica']);
    });
  }
}
