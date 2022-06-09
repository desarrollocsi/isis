import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services/';
import {
  tiempoSeleccionado,
  obtenerIndiceProgramacionSala,
  generarObjectHoraDeProgramacion,
} from '../utils/utils';

@Component({
  selector: 'app-programaciondesalas-modal-salas',
  templateUrl: './programaciondesalas-modal-salas.component.html',
  styleUrls: ['./programaciondesalas-modal-salas.component.css'],
})
export class ProgramaciondesalasModalSalasComponent
  implements OnInit, OnDestroy
{
  isModal: boolean = false;
  fecha: string;
  disponibilidadDeSalas$: Observable<any>;
  numeroDeSala: string = '';
  minutoDeIntervencion: number;

  disponibilidadDeSalas: any = [];
  tiempoDeProgramacion: any = [];
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private IntermedaryService: IntermedaryService,
    private ProgramaciondesalasService: ProgramaciondesalasService
  ) {}

  ngOnInit(): void {
    this.IntermedaryService.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((minutoDeIntervencion: any) => {
        (this.isModal = true),
          (this.minutoDeIntervencion = minutoDeIntervencion),
          this.getDisponibilidadDeSalas();
      });
    this.IntermedaryService._fecha.subscribe(
      (fecha: string) => (this.fecha = fecha)
    );
  }

  get activeSala01() {
    return this.numeroDeSala === '01';
  }
  get activeSala02() {
    return this.numeroDeSala === '02';
  }

  get activeSala03() {
    return this.numeroDeSala === '03';
  }

  getDisponibilidadDeSalas(numeroDeSala: string = '01') {
    this.ProgramaciondesalasService.getDisponibilidadDeSalas({
      fecha: this.fecha,
      numeroDeSala,
    }).subscribe((data: any) => {
      (this.disponibilidadDeSalas = data), (this.numeroDeSala = numeroDeSala);
    });
  }

  selectTime(event: any) {
    const { value, checked } = event.target as HTMLInputElement;

    const { hora, estado } = JSON.parse(value);
    if (estado) return;

    tiempoSeleccionado({
      minuto: this.minutoDeIntervencion,
      hora,
      checked,
    }).map((data: any) => {
      this.tiempoDeProgramacion = [data, ...this.tiempoDeProgramacion];
      const indice = obtenerIndiceProgramacionSala({
        hora: data.hora,
        data: this.disponibilidadDeSalas,
      });

      this.disponibilidadDeSalas[indice]['status'] = data.estado;
    });

    this.envioDeLaHoraSeleccionada();
    checked && this.closeModal();
    this.tiempoDeProgramacion = [];
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

  closeModal() {
    this.isModal = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
