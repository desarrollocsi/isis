import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntermedaryService } from '../../../core/services';
import { ProgramaciondesalasService } from '../services';

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
    private router: Router,
    private ProgramaciondesalasService: ProgramaciondesalasService
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
    this.ProgramaciondesalasService.getProgramacionDeSalas(cq_numope).subscribe(
      (data) => {
        this.IntermedaryService.getCodigoProgramacion(data);
        this.ProgramaciondesalasService.httpDynamic.next({
          verbo: 'PUT',
          nameButton: 'Actualizar',
        });
      }
    );
    this.router.navigate(['home/programaciondesalas/registrar']);
    this.onCloseModal();
  }

  informenOperatorio({ cq_numope }: { cq_numope: string }) {
    this.ProgramaciondesalasService.getProgramacionDeSalas(cq_numope).subscribe(
      (data) => {
        this.IntermedaryService.getCodigoProgramacion(data);
      }
    );
    this.router.navigate(['home/programaciondesalas/informeoperatorio']);
    this.onCloseModal();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
