import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATA__ATENCION } from '../data';

@Component({
  selector: 'app-admision-datosdelpacientes',
  templateUrl: './admision-datosdelpacientes.component.html',
  styleUrls: ['./admision-datosdelpacientes.component.css'],
})
export class AdmisionDatosdelpacientesComponent implements OnInit {
  @Input() paciente: any;

  atenciones$: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    this.atenciones$ = of(DATA__ATENCION);
  }
}
