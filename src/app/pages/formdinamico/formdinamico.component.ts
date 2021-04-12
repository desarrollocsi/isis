import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { IntermedaryService } from 'src/app/core/services/intermedary.service';
import { FormdinamicoService } from './services/formdinamico.service';

@Component({
  selector: 'app-formdinamico',
  template: `
    <div class="container">
      <app-formdinamico-list [lists]="lists$ | async"></app-formdinamico-list>
      <app-formdinamico-modal [forms]="forms$"></app-formdinamico-modal>
    </div>
  `,
  styleUrls: ['./formdinamico.component.css'],
})
export class FormdinamicoComponent implements OnInit {
  lists$: Observable<any>;
  forms$: Observable<any>;

  constructor(
    private IS: IntermedaryService,
    private FS: FormdinamicoService
  ) {}

  get route() {
    return this.IS._route;
  }

  ngOnInit(): void {
    this.getList();
    this.getForm();
  }

  getList() {
    this.lists$ = this.route.pipe(
      take(1),
      switchMap((data) => this.FS.getApiDynamic(data))
    );
  }

  getForm() {
    this.forms$ = this.route.pipe(
      take(1),
      switchMap((data) => this.FS.getApiFormDynamic(data))
    );
  }
}
