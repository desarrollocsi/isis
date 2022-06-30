import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PagoConsumoService } from '../services/pagoconsumo-service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators,} from '@angular/forms';

@Component({
  selector: 'app-pagoconsumo-modal',
  templateUrl: './pagoconsumo-modal.component.html',
  styleUrls: ['../pagoconsumo.component.css'],
})

export class PagoConsumoModalComponent implements OnInit, OnDestroy {
  status: boolean = false;
  modal$: Observable<void>;
  Tittle: String = 'Agregar Forma de Pago';
  form: FormGroup;
  ImputError = 'input-error animate__animated animate__fadeIn';
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor( 
    private PCS: PagoConsumoService,
    private fb: FormBuilder,
  ){}

  get campos() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      forma: [1],
      medio: [1],
      periodo: [null],
      moneda: [1],
      marcatarjeta: [1],
      importe: [0, Validators.required],
    });
    this.PCS._modal2
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: boolean) => (this.status = data))
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
  test(): void{
    console.log(this.campos.marcatarjeta)
  }
}
