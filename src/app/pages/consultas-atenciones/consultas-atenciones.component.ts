import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ConsultasAtencionesService } from './services/consultas-atenciones.service';

@Component({
  selector: 'app-consultas-atenciones',
  templateUrl: './consultas-atenciones.component.html',
  styleUrls: ['./consultas-atenciones.component.css'],
})
export class ConsultasAtencionesComponent implements OnInit {
  search$ = new Subject<string>();
  data$: Observable<any>;

  constructor(private CAS: ConsultasAtencionesService) {}

  search(search: any) {
    this.search$.next(search.value);
  }

  ngOnInit(): void {
    this.data$ = this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((search: string) => this.CAS.getConsultasAtenciones(search))
    );
  }
}
