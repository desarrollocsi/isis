import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { F419Service } from '../services';
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
  constructor(private F419Service: F419Service, private Router: Router) {}

  ngOnInit(): void {
    this.getIncidenciasList();
    this.F419Service.refresh.subscribe((_) => this.getIncidenciasList());
  }

  getIncidenciasList() {
    this.dataIncidencia$ = this.F419Service.getIncidencia();
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
    this.F419Service.updateStatusIncidencia({
      id,
      fecha_incidencia,
      historia,
      glosa,
      turno,
      estado: codigoStatus,
      reporta_area,
      usuario_registro,
    }).subscribe(console.log);
  }

  onPerfil(rol: string) {
    const indice = perfilMenu.findIndex(({ perfil }) => perfil === rol);
    this.datas$ = of(perfilMenu[indice].menu).pipe(
      map((data) => data.filter(({ status }) => status === true))
    );
  }

  dropdownDynamic({ method, id }, data: any) {
    const METHOD_DYNAMIC = {
      onUpdateStatus: () => this.onUpdateStatus(data, id),
      onUpdate: () => this.onUpdate(data),
    };

    METHOD_DYNAMIC[method]();
  }
}
