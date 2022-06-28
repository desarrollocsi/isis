import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PagoConsumoService } from '../services/pagoconsumo-service';

@Component({
  selector: 'app-pagoconsumo-modal',
  templateUrl: './pagoconsumo-modal.component.html',
  styleUrls: ['../pagoconsumo.component.css'],
})
export class PagoConsumoModalComponent implements OnInit, OnDestroy {
  status: boolean = false;
  modal$: Observable<void>;
  Tittle: String = 'Agregar Forma de Pago';
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private PCS: PagoConsumoService,
  ){}

  ngOnInit(): void {
    this.PCS._modal2
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: boolean) => (this.status = data));
    this.opeModal();
  }

  opeModal() {
    this.PCS.openModal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => (this.status = true));
  }

  closeModal() {
    this.status = false;
    this.PCS.setModal(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
