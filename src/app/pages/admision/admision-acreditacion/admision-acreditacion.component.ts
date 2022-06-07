import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { COBERTURA } from '../data';

@Component({
  selector: 'app-admision-acreditacion',
  templateUrl: './admision-acreditacion.component.html',
  styleUrls: ['./admision-acreditacion.component.css'],
})
export class AdmisionAcreditacionComponent implements OnInit {
  @Input() acreditacion: any;
  @Output() coberturas: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  coberturas$: Observable<any>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ApPaternoPaciente: [null],
      NoPaciente: [null],
      CoAfPaciente: [null],
      ApMaternoPaciente: [null],
      CoProducto: [null],
      CoDescripcion: [null],
      CoParentesco: [null],
      NuPlan: [null],
      TiCaContratante: [null],
      NoPaContratante: [null],
      NoContratante: [null],
      NoMaContratante: [null],
      TiDoContratante: [null],
      IdReContratante: [null],
      CoReContratante: [null],
    });
  }

  getCoberturas() {
    this.coberturas.emit(COBERTURA.coberturas);
  }
}
