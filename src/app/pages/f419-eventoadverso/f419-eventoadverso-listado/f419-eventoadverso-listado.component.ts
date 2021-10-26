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
  title: string =
    'LISTADO F419 REPORTE DE INCIDENCIA/EVENTO ADVERSO - ASISTENCIAL';
  constructor(private F419Service: F419Service, private Router: Router) {}

  ngOnInit(): void {
    this.dataIncidencia$ = this.F419Service.getIncidencia();
  }

  onRegistrar() {
    this.Router.navigate(['home/calidad/f419/registrar']);
  }

  onUpdate({ id }) {
    this.F419Service.getIncidenciaDetail(id).subscribe((data: any) =>
      this.F419Service.idIncidencia.next(data)
    );
    this.Router.navigate(['home/calidad/f419/registrar']);
  }
}
