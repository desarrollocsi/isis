import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';

@Component({
  selector: 'app-agendasecretaria-modal',
  templateUrl: './agendasecretaria-modal.component.html',
  styleUrls: ['./agendasecretaria-modal.component.css'],
})
export class AgendasecretariaModalComponent implements OnInit, OnDestroy {
  status: boolean = false;
  modal$: Observable<void>;
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(private AGS: AgendasecretariaService) {}

  ngOnInit(): void {
    this.opeModal();
  }

  opeModal() {
    this.AGS.openModal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => (this.status = true));
  }

  closeModal() {
    this.status = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
