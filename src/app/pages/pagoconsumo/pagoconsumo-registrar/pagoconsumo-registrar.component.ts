import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthStorageService, IntermedaryService, MessageService, HttpService } from '../../../core/services';
import { PagoConsumoService } from '../services/pagoconsumo-service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagoconsumo-registrar',
  templateUrl: './pagoconsumo-registrar.component.html',
  styleUrls: ['../pagoconsumo.component.css'],
})
export class PagoConsumoRegistrarComponent implements OnInit, OnDestroy {
  afectada = true;
  tipocomprobante$: Observable<any>;
  tipodocumento$: Observable<any>;
  pagos$: any;
  form: FormGroup;
  VERB_HTTP = 'POST';
  tituloBoton = 'Registrar';
  pattern_doc = '';
  pagos: any;
  submitted = false;
  rxTime = new Date();
  subscription: Subscription;
  ImputError = 'input-error animate__animated animate__fadeIn';

  constructor(
    private fb: FormBuilder,
    private ATH: AuthStorageService,
    private PCS: PagoConsumoService,
    private IS: IntermedaryService,
    private MS: MessageService,
    private HS: HttpService
  ) {}

  get campos() {
    return this.form.controls;
  }

  private readonly unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.form = this.fb.group({
      pagos: this.fb.array([]),
      tipo_comprobante: 1,
      tipo_documento: 1,
      nro_documento: [null, Validators.required],
      nombres: [null, Validators.required],
      domicilio: [null, Validators.required],
      paciente: [null],
      aseguradora: [null],
      plan: [null],
      tipo_paciente: [null],
      cfijo: [null],
      cvariable: [null],
      creador: [null],
      creacion: [null],
      modificador: [null],
      modificacion: [null],
      usuario: [this.ATH.User],
    });
    this.pagos = this.form.get('medidas') as FormArray;
    this.tipocomprobante$ = this.HS.getTipoComprobantes();
    this.tipodocumento$ = this.HS.getTipoDocumento();
    //this.getDataReclamo();
  }

  // getDataReclamo() {
  //   this.IS._dataReclamo
  //     .pipe(
  //       tap((_) => {
  //         this.VERB_HTTP = 'PUT';
  //         this.tituloBoton = 'Actualizar';
  //       }),
  //       takeUntil(this.unsubscribe$)
  //     )
  //     .subscribe((data) => {
  //       this.form.patchValue(data);
  //       this.nrodoc_valid();
  //     });
  // }
  
  nrodoc_valid() {
    switch (this.campos.tipo_documento.value) {
      default:
        this.pattern_doc = '[A-Za-z0-9]{0,15}';
        break;
      case 1:
        this.pattern_doc = '[0-9]{8,8}';
        break;
      case 11:
        this.pattern_doc = '[0-9]{11,11}';
        this.campos.paterno.reset();
        this.campos.materno.reset();
        break;
    }
  }

  openModal(data: any) {
    this.PCS._modal.next();
    if (data != null) {
      this.PCS.setDataFPago(data);
    }
  }

  setMedioPago(data: any) {
    data.map((val: any) => {
      Object.assign(val, { id: 0 });
      const group = this.fb.group(val);
      this.pagos.push(group);
    });
  }

  addPago() {
    const form = {
      formapago: [2],
      moneda: [1],
      apagar: [0],
      recibido: [0],
      vuelto: [0],
      tarjeta: [0],
      notacredito: [0],
    };
    const group = this.fb.group(form);
    this.pagos.push(group);
  }

  delPago(indice: number) {
    this.pagos.removeAt(indice);
  }

  onSubmit(): void {
    Object.keys(this.form.controls).forEach((field) => {
      let control = this.form.get(field);
      control.updateValueAndValidity();
    });
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.VERB_HTTP == 'PUT') {
        this.campos.modificador.setValue(this.campos.usuario.value);
      } else {
        this.campos.periodo.setValue(
          moment(this.campos.fecha.value).format('YYYYMM')
        );
        this.campos.creador.setValue(this.campos.usuario.value);
      }
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
