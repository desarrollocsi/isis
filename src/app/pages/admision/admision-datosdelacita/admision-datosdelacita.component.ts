import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admision-datosdelacita',
  templateUrl: './admision-datosdelacita.component.html',
  styleUrls: ['./admision-datosdelacita.component.css'],
})
export class AdmisionDatosdelacitaComponent implements OnInit {
  @Input() citas: any;

  constructor() {}

  ngOnInit(): void {}
}
