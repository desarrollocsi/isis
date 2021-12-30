import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthStorageService, IntermedaryService, MessageService } from '../../../core/services';
import { ReclamosService } from '../services/reclamos.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common'


@Component({
    selector: 'app-reclamos-registrar',
    templateUrl: './reclamos-registrar.component.html',
    styleUrls: ['./reclamos-registrar.component.css'],
})

export class ReclamosRegistrarComponent implements OnInit, OnDestroy {
    afectada = true;
    estados$: Observable<any>;
    resultados$: Observable<any>;
    etapas$: Observable<any>;
    tipodocumentos$: Observable<any>;
    clasificaciones$: Observable<any>;
    servicios$: Observable<any>;
    medios_recepcion$: Observable<any>;
    form: FormGroup;
    VERB_HTTP = 'POST';
    tituloBoton = 'Registrar';
    pattern_doc_p = '';
    pattern_doc = '';
    medidas$: Observable<any>
    medidas: any;
    submitted = false;
    frmafectada = new FormControl();
    frmaresultemail = new FormControl();
    rxTime = new Date();
    subscription: Subscription;
    ImputError = 'input-error animate__animated animate__fadeIn'

    constructor(
        private fb: FormBuilder,
        private ATH: AuthStorageService,
        private RS: ReclamosService,
        private IS: IntermedaryService,
        private MS: MessageService,
        private router: Router,
        private location: Location
    ) { }

    get campos() {
        return this.form.controls;
    }

    private readonly unsubscribe$: Subject<void> = new Subject();

    ngOnInit(): void {
        this.form = this.fb.group({
            medidas: this.fb.array([]),
            re_cod: [null],
            periodo: [null],
            medio: [2, Validators.required],
            tipo_documento_p: 1,
            nro_documento_p: [null],
            nombres_p: [null],
            paterno_p: [null],
            materno_p: [null],
            domicilio: [null, Validators.required],
            telefono: [null, Validators.required],
            email: [null, [Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$"), Validators.required]],
            result_email: [1, Validators.required],
            tipo_documento: 1,
            nro_documento: [null],
            nombres: [null],
            paterno: [null],
            materno: [null],
            medio_recepcion: [2, Validators.required],
            cod_fisico: [null],
            fecha: [moment().format('YYYY-MM-DDThh:mm'), Validators.required],
            servicio: [null, Validators.required],
            detalle: [null, Validators.required],
            compete: [1, Validators.required],
            derivado_tipo: [null],
            derivado_codigo: [null],
            clasificacion1: [null],
            clasificacion2: [null],
            clasificacion3: [null],
            estado: [1, Validators.required],
            codigo_original: [null],
            etapa: [null],
            resultado: [null],
            mot_concl_antic: [null],
            fecha_notif_result: moment().format('YYYY-MM-DD'),
            fecha_result: moment().format('YYYY-MM-DD'),
            comunic_result: [null],
            creador: [null],
            creacion: [null],
            modificador: [null],
            modificacion: [null],
            usuario: [this.ATH.User],
        });
        this.medidas = this.form.get('medidas') as FormArray;
        this.getEstado(1)
        this.getEtapaResultado(1)
        this.tipodocumentos$ = this.RS.getTipoDocumento()
        this.clasificaciones$ = this.RS.getClasificacion()
        this.servicios$ = this.RS.getServicio()
        this.medios_recepcion$ = this.RS.getMedioRecepcion()
        this.getDataReclamo()
    };

    getDataReclamo() {
        this.IS._dataReclamo
            .pipe(tap((_) => {
                this.VERB_HTTP = 'PUT';
                this.tituloBoton = 'Actualizar';
            }), takeUntil(this.unsubscribe$)
            ).subscribe(data => {
                this.form.patchValue(data)
                this.setMedidas(data.medidas)
                this.getEstado(data.compete)
                this.getEtapaResultado(data.estado)
                this.f_result_email(data.result_email)
                this.nrodocp_valid()
                this.nrodoc_valid()
                data.nro_documento == data.nro_documento_p && data.tipo_documento == data.tipo_documento_p ? this.afectada = true : this.afectada = false
            })
    }

    getEstado(compete: number) {
        var est = compete == 2 ? [3, 6] : [1, 2, 4, 5, 6]
        this.estados$ = this.RS.getEstado().pipe(map(data => data.filter(p => est.includes(p.er_cod))))
        if (this.campos.estado.value != null && !est.includes(this.campos.estado.value)) {
            this.campos.estado.setValue(null)
        }
        if (compete == 2) {
            this.campos.estado.setValue(3)
            this.campos.resultado.setValue(0)
            this.getEtapaResultado(3)
        }
    }

    getEtapaResultado(estado: number) {
        var etp, res, x
        if (estado == 1) { etp = [3]; res = [1, 2, 3, 4, 5] }
        if (estado == 2) { etp = [1, 2, 3]; res = [0] }
        if (estado == 3) { etp = []; res = [0] }
        if (estado == 4 || estado == 5) { etp = []; res = [] }
        if (estado == 6) { etp = [4]; res = [1, 2, 3, 4, 5] }
        this.etapas$ = this.RS.getEtapa().pipe(map(data => data.filter(p => etp.includes(p.etr_cod))))
        this.resultados$ = this.RS.getResultado().pipe(map(data => data.filter(p => res.includes(p.rr_cod))))
        if (this.campos.etapa.value != null && !etp.includes(this.campos.etapa.value)) {
            this.campos.etapa.setValue(null)
        }
        if (this.campos.resultado.value != null && !res.includes(this.campos.resultado.value)) {
            this.campos.resultado.setValue(null)
        }
    }

    nrodocp_valid() {
        const ndoc = this.campos.nro_documento_p.value
        switch (this.campos.tipo_documento_p.value) {
            default:
                this.pattern_doc_p = "[A-Za-z0-9]{0,15}"
                break
            case 1:
                this.pattern_doc_p = "[0-9]{8,8}"
                break
            case 11:
                this.pattern_doc_p = "[0-9]{11,11}"
                this.campos.paterno_p.setValue(null)
                this.campos.materno_p.setValue(null)
                break
        }
    }

    nrodoc_valid() {
        const ndoc = this.campos.nro_documento.value
        switch (this.campos.tipo_documento.value) {
            default:
                this.pattern_doc = "[A-Za-z0-9]{0,15}"
                break
            case 1:
                this.pattern_doc = "[0-9]{8,8}"
                break
            case 11:
                this.pattern_doc = "[0-9]{11,11}"
                this.campos.paterno.setValue(null)
                this.campos.materno.setValue(null)
                break
        }
    }

    f_afectada(event: any) {
        this.afectada = event.target.checked
    }

    f_result_email(event: any) {
        this.campos.result_email.setValue(event)
    }

    setMedidas(data: any) {
        data.map((val: any) => {
            Object.assign(val, { id: 0 })
            const group = this.fb.group(val)
            this.medidas.push(group)
        })
    }

    agregarMedidas() {
        const form = {
            naturaleza: [2],
            proceso: [1],
            descripcion: ["Descripcion de la medida"],
            fecha_implem: moment().format('YYYY-MM-DD'),
            fecha_culm: moment().format('YYYY-MM-DD')
        }
        const group = this.fb.group(form);
        this.medidas.push(group)
    }

    deleteMedidas(indice: number) {
        this.medidas.removeAt(indice);
    }

    onSubmit() {
        //console.log(this.form.value)
        Object.keys(this.form.controls).forEach(field => {
            let control = this.form.get(field);
            control.updateValueAndValidity();
        });
        this.form.markAllAsTouched();
        if (this.form.valid) {
            if ([1,2].includes(this.campos.resultado.value) && this.medidas.length == 0) {
                this.MS.MessageInfo("Falta registrar medidas")
                return false
            }else{
                this.medidas = []
            }
            if (this.afectada) {
                this.campos.tipo_documento.setValue(this.campos.tipo_documento_p.value)
                this.campos.nro_documento.setValue(this.campos.nro_documento_p.value)
                this.campos.nombres.setValue(this.campos.nombres_p.value)
                this.campos.paterno.setValue(this.campos.paterno_p.value)
                this.campos.materno.setValue(this.campos.materno_p.value)
            }
            if (this.VERB_HTTP == 'PUT') {
                this.campos.modificacion.setValue(moment().format('YYYY-MM-DDThh:mm'));
                this.campos.modificador.setValue(this.campos.usuario.value)
            } else {
                this.campos.periodo.setValue(moment(this.campos.fecha.value).format('YYYYMM'))
                this.campos.creacion.setValue(moment().format('YYYY-MM-DDThh:mm'));
                this.campos.creador.setValue(this.campos.usuario.value)
            }

            this.RS.apidynamic('reclamos', this.VERB_HTTP, this.form.value)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((data) => {
                    console.log (data)
                    data['status'] ? this.MS.MessageSucces(data['message']) : this.MS.MessageError(data['message'])
                    /*this.router.navigate(['home/reclamos/']);*/
                });
        } else {
            for (let ele in this.form.controls) {
                if (this.form.controls[ele].errors) {
                    this.MS.MessageInfo("Falta registrar " + ele)
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    back(): void {
        console.log(typeof(this.campos.clasificacion3.value))
        /*this.location.back()*/
    }
}
