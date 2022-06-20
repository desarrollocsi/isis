import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admision-acreditacion',
  templateUrl: './admision-acreditacion.component.html',
  styleUrls: ['./admision-acreditacion.component.css'],
})
export class AdmisionAcreditacionComponent implements OnInit {
  @Input() acreditacion: any;
  @Output() selectAcreditacion = new EventEmitter<{}>();

  coberturas$: Observable<any>;

  constructor() {}

  ngOnInit(): void {}

  getAcreditacion(data: any) {
    this.selectAcreditacion.emit(data);
  }

  selectItem(data: any) {
    this.selectAcreditacion = data;
  }
}
