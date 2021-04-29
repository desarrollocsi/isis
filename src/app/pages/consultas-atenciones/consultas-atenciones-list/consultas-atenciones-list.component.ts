import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultas-atenciones-list',
  templateUrl: './consultas-atenciones-list.component.html',
  styleUrls: ['./consultas-atenciones-list.component.css'],
})
export class ConsultasAtencionesListComponent implements OnInit {
  @Input() listados: any;
  @Input() status: boolean;
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
