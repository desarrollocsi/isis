import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HistoriaService } from '../services/historia.service';

@Component({
  selector: 'app-historia-search',
  templateUrl: './historia-search.component.html',
  styleUrls: ['./historia-search.component.css'],
})
export class HistoriaSearchComponent implements OnInit {
  search$ = new Subject<string>();
  datas$: Observable<any>;
  constructor(private HS: HistoriaService) {}

  search(search: any) {
    this.search$.next(search.value);
  }

  ngOnInit(): void {
    this.datas$ = this.search$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((search: string) => this.HS.getSearchHistoria(search))
    );
  }

  setData(data: any) {
    this.HS.getData(data);
  }
}
