import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ReclamosService } from '../services/reclamos.service'
import { AuthStorageService, MessageService } from '../../../core/services'
import { Observable, Subject } from 'rxjs'
import * as moment from 'moment'
import { takeUntil } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-reclamos-trama',
    templateUrl: './reclamos-trama.component.html',
    styleUrls: ['./reclamos-trama.component.css']
})

export class ReclamosTramaComponent implements OnInit {
    form: FormGroup
    data$: Observable<any>
    reclamos$: any
    medidas$: any
    trama1: string = ''
    trama2: string = ''
    tipodocumentos$: Observable<any>;
    estados$: Observable<any>;
    etapas$: Observable<any>;
    resultados$: Observable<any>;
    medios_recepcion$: Observable<any>;

    estadotrama: number = 0
    anio$ = [{ id: '2021' }, { id: '2022' }, { id: '2023' }, { id: '2024' }, { id: '2025' }, { id: '2026' }]
    mes$ = [{ id: '01', text: 'Enero' }, { id: '02', text: 'Febrero' }, { id: '03', text: 'Marzo' }, { id: '04', text: 'Abril' },
    { id: '05', text: 'Mayo' }, { id: '06', text: 'Junio' }, { id: '07', text: 'Julio' }, { id: '08', text: 'Agosto' },
    { id: '09', text: 'Septiembre' }, { id: '10', text: 'Octubre' }, { id: '11', text: 'Noviembre' }, { id: '12', text: 'Diciembre' }]

    constructor(
        private fb: FormBuilder,
        private RS: ReclamosService,
        private ATH: AuthStorageService,
        private MS: MessageService
    ) { }

    get campos() {
        return this.form.controls;
    }

    private readonly unsubscribe$: Subject<void> = new Subject();

    ngOnInit(): void {
        this.form = this.fb.group({
            anio: [moment().format('YYYY')],
            mes: [moment().format('MM')],
            periodo: [],
            trama: [],
            creador: [null],
            creacion: [null],
            modificador: [null],
            modificacion: [null],
            usuario: [this.ATH.User]
        })
        this.cargatrama()
        this.tipodocumentos$ = this.RS.getTipoDocumento()
        this.estados$ = this.RS.getEstado()
        this.etapas$ = this.RS.getEtapa()
        this.resultados$ = this.RS.getResultado()
        this.medios_recepcion$ = this.RS.getMedioRecepcion()
    }

    descargar(tipo): void {
        var codipress =  '00013383'
        var treclamos = ''
        var tmedidas = ''
        const downloadlink = document.createElement('a');
        const datatype = 'data:text/plain;charset=utf-8,';

        for (var rec of this.reclamos$) {
            treclamos += [rec.periodo, '1', codipress, codipress, '1', codipress,
            rec.medio, codipress.concat('-',rec.re_cod),
            rec.tipo_documento, rec.nro_documento, (rec.tipo_documento == 11 ? rec.nombres : ''), rec.nombres, rec.paterno, rec.materno,
            rec.tipo_documento_p, rec.nro_documento_p, (rec.tipo_documento_p == 11 ? rec.nombres_p : ''), rec.nombres_p, rec.paterno_p, rec.materno_p, rec.result_email,
            rec.email, rec.domicilio, rec.telefono.replace(/[^a-zA-Z0-9]/g,''), rec.medio_recepcion, rec.fecha, rec.detalle.replace(/(\r\n|\n|\r)/gm, ""), rec.servicio, rec.compete, rec.clasificacion1,
            rec.clasificacion2, rec.clasificacion3, rec.estado, rec.codigo_original, rec.etapa, rec.derivado_tipo, rec.derivado_codigo,
            rec.resultado, rec.mot_concl_antic, rec.fecha_result, rec.comunic_result, rec.fecha_notif_result
            ].join('|') + '\n'
        }
        downloadlink.href = 'data:' + datatype + encodeURIComponent(treclamos);
        downloadlink.download = codipress + '_' + this.campos.anio.value + '_' + this.campos.mes.value + '_RECLAMOS';
        document.body.appendChild(downloadlink);
        downloadlink.click();
        document.body.removeChild(downloadlink);

        if(this.medidas$.length){
            for (var medida of this.medidas$) {
                tmedidas += [rec.medio, codipress.concat('-',medida.re_cod), ('0' + medida.numero).slice(-2), medida.descripcion.replace(/(\r\n|\n|\r)/gm, ""),
                medida.naturaleza, medida.proceso, medida.fecha_culm, medida.fecha_implem
                ].join('|') + '\n'
            }
            downloadlink.href = 'data:' + datatype + encodeURIComponent(tmedidas);
            downloadlink.download = codipress + '_' + this.campos.anio.value + '_' + this.campos.mes.value + '_MEDIDAS';
            document.body.appendChild(downloadlink);
            downloadlink.click();
            document.body.removeChild(downloadlink);
        }
    }

    onSubmit(): void {
        Swal.fire({
            title: "¡Advertencia!",
            text: 'Una vez generada la trama no podrá modificar los reclamos concluidos y los pendientes se actualizarán para el siguiente perido. ¿Seguro de generar la trama?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009b6e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.campos.periodo.setValue(this.campos.anio.value + this.campos.mes.value)
                this.campos.creacion.setValue(moment().format('YYYY-MM-DDThh:mm'));
                this.campos.creador.setValue(this.campos.usuario.value)
                this.campos.trama.setValue(JSON.stringify(this.reclamos$))
                this.RS.apidynamic('tramas', 'POST', this.form.value)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe((data) => {
                        this.MS.MessageInfo(data['message']);
                        this.cargatrama()
                    });
            }
        });
    }

    cargatrama(): void {
        var arr = []
        this.reclamos$ = null
        this.estadotrama = 0
        this.RS.apidynamic('tramas', 'GET', this.campos.anio.value + this.campos.mes.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                if (Object.keys(data).length > 0) {
                    if (data[0].trama) {
                        this.reclamos$ = JSON.parse(data[0].trama)
                        this.estadotrama = 2
                    } else {
                        this.reclamos$ = data
                        this.estadotrama = 1
                    }
                    this.reclamos$.map(
                        reclamo => {
                            reclamo.fecha = reclamo.fecha.replace(/-|T.*/g, '')
                            if (reclamo.fecha_result) { reclamo.fecha_result = reclamo.fecha_result.replace(/-|T.*/g, '') }
                            if (reclamo.fecha_notif_result) { reclamo.fecha_notif_result = reclamo.fecha_notif_result.replace(/-/g, '') }
                            reclamo.medidas.map(medida => {
                                medida.medio = reclamo.medio
                                medida.re_cod = reclamo.re_cod
                                medida.fecha_implem = medida.fecha_implem.replace(/-/g, '')
                                medida.fecha_culm = medida.fecha_culm.replace(/-/g, '')
                                arr.push(medida)
                            })
                        }
                    )
                } this.medidas$ = arr
            })
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}


