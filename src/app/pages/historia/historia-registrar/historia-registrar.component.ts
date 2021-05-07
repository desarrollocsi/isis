import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historia-registrar',
  templateUrl: './historia-registrar.component.html',
  styleUrls: ['./historia-registrar.component.css'],
})
export class HistoriaRegistrarComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoDocumento: [null],
      documento: [null],
      apellidoPaterno: [null],
      apellidoMaterno: [null],
      nombre: [null],
      fechaNacimiento: [null],
      genero: [null],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
