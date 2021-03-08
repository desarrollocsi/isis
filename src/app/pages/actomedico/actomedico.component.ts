import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ActomedicoService } from './services/actomedico.service';
import { HttpService } from '../../core/services/http.service';
import { CieForm } from '../../core/models/cie-form.class';

@Component({
  selector: 'app-actomedico',
  templateUrl: './actomedico.component.html',
  styleUrls: ['./actomedico.component.css'],
})
export class ActomedicoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private AMS: ActomedicoService,
    private http: HttpService
  ) {}
  formActoMedico: FormGroup;
  cies$: Observable<any>;
  antecedentes$: Observable<any>;
  antecedentes: any;
  diagnosticos: any;
  add = [];
  cieSelect$: Observable<any>;
  cieSelect = [];

  ngOnInit(): void {
    this.formActoMedico = this.fb.group({
      idcita: [1000],
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

    this.getCie();
    this.antecedentes$ = this.http.getAntecedentes();
    this.antecedentes = this.formActoMedico.get('antecedentes') as FormArray;
    this.diagnosticos = this.formActoMedico.get('diagnosticos') as FormArray;
  }

  get cie() {
    return this.formActoMedico.get('cie').valueChanges;
  }

  getCie() {
    this.cies$ = this.cie.pipe(
      debounceTime(900),
      distinctUntilChanged(),
      switchMap((data: any) => this.AMS.getCie(data))
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
    this.cieSelect.push(data);
    this.cieSelect$ = of(this.cieSelect);
    const group = this.fb.group({
      idcie: [null],
      tdx: [null],
    });
    this.diagnosticos.push(group);
    this.add.push(new CieForm(data));
  }

  setCie() {
    this.diagnosticos.setValue(this.add);
  }

  onSubmit() {
    this.setCie();
    this.AMS.postActoMedico(this.formActoMedico.value).subscribe(console.log);
  }
}
