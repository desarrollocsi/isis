import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services';
import {
  formatearFechaDescripcion,
  tiempoSeleccionado,
  obtenerIndiceProgramacionSala,
  generarObjectHoraDeProgramacion,
} from '../utils';

@Component({
  selector: 'app-programaciondesalas-disponibilidaddesalas',
  templateUrl: './programaciondesalas-disponibilidaddesalas.component.html',
  styleUrls: ['./programaciondesalas-disponibilidaddesalas.component.css'],
})
export class ProgramaciondesalasDisponibilidaddesalasComponent
  implements OnInit, OnDestroy
{
  numeroDeSala: string;
  fecha$: Observable<string>;
  tiempo$: Observable<number>;
  fecha: string;
  minutoDeIntervencion: string;
  disponibilidadDeSalas: any = [];
  tiempoDeProgramacion: any = [];

  private readonly unsubscribe$: Subject<void> = new Subject();
  get activeSala01() {
    return this.numeroDeSala === '01';
  }
  get activeSala02() {
    return this.numeroDeSala === '02';
  }

  get activeSala03() {
    return this.numeroDeSala === '03';
  }

  constructor(
    private IntermedaryService: IntermedaryService,
    private ProgramaciondesalasService: ProgramaciondesalasService
  ) {}

  ngOnInit(): void {
    this.getfecha();
    this.getTiempoDeIntervencion();
  }
  setFecha(fecha: string) {
    this.fecha = fecha;
    this.getDisponibilidadDeSalas();
  }

  getTiempoDeIntervencion() {
    this.ProgramaciondesalasService.__tiempoDeIntervencion$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tiempo: string) => (this.minutoDeIntervencion = tiempo));
  }

  getfecha() {
    this.fecha$ = this.IntermedaryService._fecha.pipe(
      tap((fecha: string) => this.setFecha(fecha)),
      map((fecha: string) => formatearFechaDescripcion(fecha))
    );
  }

  getDisponibilidadDeSalas(numeroDeSala: string = '01') {
    this.ProgramaciondesalasService.getDisponibilidadDeSalas({
      fecha: this.fecha,
      numeroDeSala,
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        (this.disponibilidadDeSalas = data), (this.numeroDeSala = numeroDeSala);
      });
  }

  selectTime({ value, checked }: { value: string; checked: boolean }) {
    const { hora, estado, status } = JSON.parse(value);
    if (estado) return;
    tiempoSeleccionado({
      minuto: this.minutoDeIntervencion,
      hora,
      checked,
    }).map((data) => {
      this.tiempoDeProgramacion = [data, ...this.tiempoDeProgramacion];
      const indice = this.getIndice(data);
      this.disponibilidadDeSalas[indice]['status'] = data.estado;
    });
    this.envioDeLaHoraSeleccionada();
    this.tiempoDeProgramacion = [];
  }

  getIndice({ hora }: { hora: string }) {
    return obtenerIndiceProgramacionSala({
      hora,
      data: this.disponibilidadDeSalas,
    });
  }

  envioDeLaHoraSeleccionada() {
    this.ProgramaciondesalasService.dataHorarioDeProgramacion.next(
      generarObjectHoraDeProgramacion(
        this.tiempoDeProgramacion,
        this.numeroDeSala,
        this.fecha
      )
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
