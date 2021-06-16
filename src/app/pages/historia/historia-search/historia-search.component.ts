import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

import { HistoriaService } from '../services/historia.service';

@Component({
  selector: 'app-historia-search',
  templateUrl: './historia-search.component.html',
  styleUrls: ['./historia-search.component.css'],
})
export class HistoriaSearchComponent implements OnInit {
  search$ = new Subject<string>();
  datas$: Observable<any>;
  p: number = 1;
  status: boolean = false;
  constructor(private HS: HistoriaService) {}

  searchs = new FormControl(null);

  search(search: any) {
    this.search$.next(search.value);
  }

  ngOnInit(): void {
    this.datas$ = this.search$.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((search: string) => this.HS.getSearchHistoria(search)),
      tap((_) => (this.status = true))
    );
  }

  setData(data: any) {
    this.HS.getData(data);
    this.status = false;
    this.searchs.reset();
  }
}
