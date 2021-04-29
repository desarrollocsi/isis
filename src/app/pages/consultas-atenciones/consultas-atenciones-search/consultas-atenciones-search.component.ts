import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ConsultasAtencionesService } from '../services/consultas-atenciones.service';

@Component({
  selector: 'app-consultas-atenciones-search',
  templateUrl: './consultas-atenciones-search.component.html',
  styleUrls: ['./consultas-atenciones-search.component.css'],
})
export class ConsultasAtencionesSearchComponent implements OnInit {
  search$ = new Subject<string>();
  data$: Observable<any>;
  constructor(private CAS: ConsultasAtencionesService) {}

  search(search: any) {
    this.search$.next(search.value);
  }

  ngOnInit(): void {
    this.data$ = this.search$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((search: string) => this.CAS.getConsultasAtenciones(search))
    );
  }
}
