import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  HttpService,
  AuthStorageService,
  ToasterService,
} from '../../../core/services';
import { HistoriaService } from '../services/historia.service';
@Component({
  selector: 'app-historia-registrar',
  templateUrl: './historia-registrar.component.html',
  styleUrls: ['./historia-registrar.component.css'],
})
export class HistoriaRegistrarComponent implements OnInit {
  form: FormGroup;
  VERB_HTTP: string = 'POST';
  nacionalidades$: Observable<any>;
  estadoCiviles$: Observable<any>;
  tipoDocumentos$: Observable<any>;
  ocupaciones$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private HS: HistoriaService,
    private http: HttpService,
    private ATH: AuthStorageService,
    private TS: ToasterService
  ) {}

  get campoUsuario() {
    return this.form.controls.hc_usuario;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      hc_numhis: [null],
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
      hc_estado: [null],
      hc_usuario: [this.ATH.User],
    });

    this.setData();
    this.getPaises();
    this.getEstadoCivil();
    this.getTipoDocumentos();
    this.getOcupaciones();
  }

  orderbyDescripcion(data: any) {
    return data.sort((a: any, b: any) =>
      a.descripcion > b.descripcion ? 1 : -1
    );
  }

  getPaises() {
    this.nacionalidades$ = this.http
      .getPaises()
      .pipe(map(this.orderbyDescripcion));
  }

  getEstadoCivil() {
    this.estadoCiviles$ = this.http
      .getEstadoCiviles()
      .pipe(map(this.orderbyDescripcion));
  }

  getTipoDocumentos() {
    this.tipoDocumentos$ = this.http
      .getTipoDocumentos()
      .pipe(map(this.orderbyDescripcion));
  }

  getOcupaciones() {
    this.ocupaciones$ = this.http
      .getOcupaciones()
      .pipe(map(this.orderbyDescripcion));
  }

  setData() {
    this.HS._data.subscribe((data: any) => {
      this.VERB_HTTP = 'PUT';
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.HS.apiDinamic(this.VERB_HTTP, this.form.value).subscribe(
      (data: any) => {
        this.TS.show('success', 'Bien hecho!', data.message);
        this.form.reset();
        this.campoUsuario.reset(this.ATH.User);
      }
    );
  }
}
