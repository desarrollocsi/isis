import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProgramacionService } from '../services/programacion.service';

import { IntermedaryService, ToasterService } from '../../../core/services';

@Component({
  selector: 'app-programacion-list',
  templateUrl: './programacion-list.component.html',
  styleUrls: ['./programacion-list.component.css'],
})
export class ProgramacionListComponent implements OnInit, OnDestroy {
  listProgramaciones$: Observable<any>;
  programacion$: Observable<any>;
  p: number = 1;
  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private PS: ProgramacionService,
    private IS: IntermedaryService,
    private TS: ToasterService
  ) {}

  ngOnInit(): void {
    this.getListProgramacion();
    this.IS.refresh
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => this.getListProgramacion());
  }

  openModal() {
    this.IS.modal.next();
    this.PS.getVerbHttp('POST');
  }

  getListProgramacion() {
    this.listProgramaciones$ = this.IS._fecha.pipe(
      switchMap((fecha: string) => this.PS.getProgramacionlist(fecha))
    );
  }

  onEdit(id: string) {
    this.PS.getProgramacionShow(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.PS.getDataProgramacion(data);
        this.IS.modal.next();
        this.PS.getVerbHttp('PUT');
      });
  }

  onDelete(id: string) {
    this.PS.getProgramacionDelete(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) =>
          this.TS.show(
            'success',
            'Bien hecho!',
            'Se elimino correctamente',
            3500
          ),
        (error: any) =>
          this.TS.show('error', 'Algo paso!', error.error.message, 3500)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
