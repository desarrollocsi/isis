import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { F419Service } from '../services';
import { MessageService } from '../../../core/services';
import { perfilMenu } from '../db/db';
import { rulesParameters } from '../utils';
import * as moment from 'moment';

@Component({
  selector: 'app-f419-eventoadverso-listado',
  templateUrl: './f419-eventoadverso-listado.component.html',
  styleUrls: ['./f419-eventoadverso-listado.component.css'],
})
export class F419EventoadversoListadoComponent implements OnInit {
  dataIncidencia$: Observable<any>;
  title: string = 'Listado F419 de I/EA';
  // title: string = 'Listado F419 Reporte de I/EA';
  perfil: string;
  dropdowns$: Observable<any>;

  fecha$ = new BehaviorSubject<{}>(null);
  __fecha = this.fecha$.asObservable();

  constructor(
    private F419Service: F419Service,
    private Router: Router,
    private MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this.F419Service.refresh.subscribe((_) => this.getIncidenciasList());
    this.getIncidenciasList();
    this.getFecha(moment().format('YYYY-MM-DD'));
    this.dropdownsMenu();
  }

  getFecha(fecha: string) {
    this.fecha$.next({ fecha, rol: localStorage.getItem('_rol') });
  }

  getIncidenciasList() {
    this.dataIncidencia$ = this.__fecha.pipe(
      switchMap((paramet: any) => this.F419Service.getIncidencia(paramet))
    );
  }

  onRegistrar() {
    this.Router.navigate(['home/calidad/f419/registrar']);
  }

  onUpdate({ id }, action: any) {
    this.F419Service.getIncidenciaDetail(id).subscribe((data: any) =>
      this.F419Service.idIncidencia.next(rulesParameters(action, data))
    );
    this.Router.navigate(['home/calidad/f419/registrar']);
  }

  onUpdateStatus(
    {
      id,
      fecha_incidencia,
      historia,
      glosa,
      turno,
      reporta_area,
      usuario_registro,
    },
    codigoStatus
  ) {
    let data = {
      id,
      fecha_incidencia,
      historia,
      glosa,
      turno,
      estado: codigoStatus,
      reporta_area,
      usuario_registro,
    };

    const PARAMENTS__DYNAMIC = {
      data,
      title: '¿Desea cambiar el estado de IE/A?',
      icon: 'info',
      buttonText: 'OK',
      cancelButton: true,
      key: 'STATUS',
      api: this.F419Service,
    };

    this.MessageService.MessageConfirm(PARAMENTS__DYNAMIC);
  }

  onPerfil(rol: string) {
    localStorage.setItem('_rol', rol);
  }

  dropdownsMenu() {
    const indice = perfilMenu.findIndex(
      ({ perfil }) => perfil === localStorage.getItem('_rol')
    );
    this.dropdowns$ = of(perfilMenu[indice].menu).pipe(
      map((data: any) => data.filter(({ status }) => status === true))
    );
  }

  dropdownDynamic({ method, id, action }, data: any) {
    const METHOD_DYNAMIC = {
      onUpdateStatus: () => this.onUpdateStatus(data, id),
      onUpdate: () => this.onUpdate(data, action),
    };

    METHOD_DYNAMIC[method]();
  }
}
