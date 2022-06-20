import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admision-coberturas',
  templateUrl: './admision-coberturas.component.html',
  styleUrls: ['./admision-coberturas.component.css'],
})
export class AdmisionCoberturasComponent implements OnInit {
  @Input() coberturas: any;
  @Output() selectCoberturas: EventEmitter<any> = new EventEmitter();

  selectCobertura: any;

  constructor() {}

  ngOnInit(): void {}

  generarAutorizacion(data: any) {
    console.log(data);

    Swal.fire({
      title: '¿Esta seguro de Seleccionar la cobertura?',
      text: `${data.CoberturaDescripcion}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectCoberturas.emit(data);
        this.selectCobertura = data;
      }
    });
  }
}
