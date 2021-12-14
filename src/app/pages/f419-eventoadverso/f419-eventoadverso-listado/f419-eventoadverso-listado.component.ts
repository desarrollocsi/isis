import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { F419Service } from '../services';
import { MessageService } from '../../../core/services';
import { perfilMenu } from '../db/db';

@Component({
  selector: 'app-f419-eventoadverso-listado',
  templateUrl: './f419-eventoadverso-listado.component.html',
  styleUrls: ['./f419-eventoadverso-listado.component.css'],
})
export class F419EventoadversoListadoComponent implements OnInit {
  dataIncidencia$: Observable<any>;
  title: string = 'Listado F419 Reporte de I/EA - Asistencial';
  perfil: string;
  datas$: Observable<any>;

  fecha$ = new Subject<{}>();

  constructor(
    private F419Service: F419Service,
    private Router: Router,
    private MessageService: MessageService
  ) {}

  getFecha(fecha: string) {
    this.fecha$.next({ fecha, rol: localStorage.getItem('_rol') });
  }

  ngOnInit(): void {
    this.F419Service.refresh.subscribe((_) => this.getIncidenciasList());
    this.getIncidenciasList();
  }

  getIncidenciasList() {
    this.dataIncidencia$ = this.fecha$.pipe(
      switchMap((paramet: any) => this.F419Service.getIncidencia(paramet))
    );
  }

  onRegistrar() {
    this.Router.navigate(['home/calidad/f419/registrar']);
  }

  onUpdate({ id }) {
    this.F419Service.getIncidenciaDetail(id).subscribe((data: any) =>
      this.F419Service.idIncidencia.next({
        verb: 'PUT',
        data,
        nameButton: 'Actualizar',
      })
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
    this.MessageService.MessageConfirm(
      {
        id,
        fecha_incidencia,
        historia,
        glosa,
        turno,
        estado: codigoStatus,
        reporta_area,
        usuario_registro,
      },
      this.F419Service
    );
  }

  onPerfil(rol: string) {
    const indice = perfilMenu.findIndex(({ perfil }) => perfil === rol);
    this.datas$ = of(perfilMenu[indice].menu).pipe(
      map((data) => data.filter(({ status }) => status === true))
    );
    localStorage.setItem('_rol', rol);
  }

  dropdownDynamic({ method, id }, data: any) {
    const METHOD_DYNAMIC = {
      onUpdateStatus: () => this.onUpdateStatus(data, id),
      onUpdate: () => this.onUpdate(data),
    };

    METHOD_DYNAMIC[method]();
  }
}
