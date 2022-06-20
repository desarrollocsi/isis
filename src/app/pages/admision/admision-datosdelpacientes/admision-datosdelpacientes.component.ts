import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';
import { DATA__ATENCION } from '../data';

@Component({
  selector: 'app-admision-datosdelpacientes',
  templateUrl: './admision-datosdelpacientes.component.html',
  styleUrls: ['./admision-datosdelpacientes.component.css'],
})
export class AdmisionDatosdelpacientesComponent implements OnInit {
  @Input() paciente: any;

  atenciones$: Observable<any>;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.atenciones$ = of(DATA__ATENCION);

    this.form = this.fb.group({});
  }
}
