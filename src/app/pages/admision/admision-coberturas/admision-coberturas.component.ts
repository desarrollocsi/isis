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

  constructor() {}

  ngOnInit(): void {}

  generarAutorizacion(data: any) {
    console.log(data);

    Swal.fire({
      title: '¿Esta seguro de Seleccionar la cobertura?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.selectCoberturas.emit(data);
      }
    });

    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire('Saved!', '', 'success');
    //     this.selectCoberturas.emit(data);
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info');
    //   }
    // });
  }
}
