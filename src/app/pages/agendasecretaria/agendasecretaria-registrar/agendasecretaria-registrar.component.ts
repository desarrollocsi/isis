import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-agendasecretaria-registrar',
  templateUrl: './agendasecretaria-registrar.component.html',
  styleUrls: ['./agendasecretaria-registrar.component.css'],
})
export class AgendasecretariaRegistrarComponent implements OnInit {
  form: FormGroup;

  search = new Subject<string>();
  _search = this.search.asObservable();

  data$: Observable<string>;

  constructor(private fb: FormBuilder) {}

  getValue(target: EventTarget): string {
    return (target as HTMLInputElement).value;
  }

  setSearch(search: string) {
    this.search.next(search);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [null],
    });
    this.data$ = this._search.pipe(debounceTime(500), distinctUntilChanged());
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
