import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';

@Component({
  selector: 'app-programaciondesalas-modal',
  templateUrl: './programaciondesalas-modal.component.html',
  styleUrls: ['./programaciondesalas-modal.component.css'],
})
export class ProgramaciondesalasModalComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  isModal: boolean = false;
  programacionData: [] = [];

  constructor(
    private IntermedaryService: IntermedaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.IntermedaryService.modal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        (this.programacionData = data), (this.isModal = true);
      });
  }

  onCloseModal() {
    this.isModal = false;
  }

  update({ cq_numope }) {
    this.onCloseModal();
    this.router.navigate(['home/programaciondesalas/registrar']);
    this.IntermedaryService.getCodigoProgramacion(cq_numope);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
