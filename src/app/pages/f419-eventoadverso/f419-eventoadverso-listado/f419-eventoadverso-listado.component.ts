import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { F419Service } from '../services';

@Component({
  selector: 'app-f419-eventoadverso-listado',
  templateUrl: './f419-eventoadverso-listado.component.html',
  styleUrls: ['./f419-eventoadverso-listado.component.css'],
})
export class F419EventoadversoListadoComponent implements OnInit {
  dataIncidencia$: Observable<any>;
  title: string = 'Listado F419 Reporte de I/EA - Asistencial';
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
}
