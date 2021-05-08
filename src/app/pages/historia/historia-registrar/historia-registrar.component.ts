import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HistoriaService } from '../services/historia.service';
@Component({
  selector: 'app-historia-registrar',
  templateUrl: './historia-registrar.component.html',
  styleUrls: ['./historia-registrar.component.css'],
})
export class HistoriaRegistrarComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HistoriaService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      hc_tipodoc: [null],
      hc_numdoc1: [null],
      hc_apepat: [null],
      hc_apemat: [null],
      hc_nombre: [null],
      hc_tipohc: [null],
      hc_estcivil: [null],
      hc_fecnac: [null],
      hc_sexo: [null],
      hc_ubnacim: [null],
      hc_direccion: [null],
      hc_nacionalidad: [null],
      hc_telefono1: [null],
      hc_ubdirec: [null],
      hc_telefono2: [null],
      hc_ocupacion: [null],
      hc_raza: [null],
      hc_obs: [null],
    });
  }

  onSubmit() {
    this.hs.postGenerarHistoria(this.form.value).subscribe(console.log);
  }
}
