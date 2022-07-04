import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActomedicoService } from './services/actomedico.service';

@Component({
  selector: 'app-search',
  template: `<section class="card">
    <div class="group container__search">
      <input
        type="text"
        class="input-control"
        [placeholder]="nameSearch"
        #search
        (keyup)="searchDynamic(search.value)"
      />
      <label class="label-control">{{ nameSearch }}</label>

      <ng-container *ngIf="datas$ | async as datas">
        <ng-container *ngIf="datas.length > 0">
          <aside class="container__list">
            <ul>
              <li
                *ngFor="let data of datas"
                class="item__list"
                (click)="selectItem(data)"
              >
                {{ data.descripcion }}
              </li>
            </ul>
          </aside>
        </ng-container>
      </ng-container>
    </div>
  </section> `,
  styleUrls: ['./actomedico.component.css'],
})
export class SearchComponent implements OnInit {
  datas$: Observable<any>;

  @Input() nameSearch: string;
  @Output() item: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  constructor(private ActomedicoService: ActomedicoService) {}

  searchDynamic(text: string) {
    this.datas$ = this.ActomedicoService.search({ text, key: this.nameSearch });
  }

  selectItem(data: any) {
    const datas = { key: this.nameSearch, data };
    this.item.emit(datas);
    this.datas$ = of([]);
  }
}

@Component({
  selector: 'app-medicamento',
  template: `<h1>Medicamento</h1>`,
  styleUrls: ['./actomedico.component.css'],
})
export class MedicamentoComponent implements OnInit {
  ngOnInit(): void {}
}

@Component({
  selector: 'app-procedimiento',
  template: `<h1>procedimiento</h1>`,
  styleUrls: ['./actomedico.component.css'],
})
export class ProcedimientoComponent implements OnInit {
  ngOnInit(): void {}
}
