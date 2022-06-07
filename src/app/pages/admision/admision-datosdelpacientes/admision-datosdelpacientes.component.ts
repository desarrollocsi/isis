import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admision-datosdelpacientes',
  templateUrl: './admision-datosdelpacientes.component.html',
  styleUrls: ['./admision-datosdelpacientes.component.css'],
})
export class AdmisionDatosdelpacientesComponent implements OnInit {
  @Input() paciente: any;
  constructor() {}

  ngOnInit(): void {}
}
