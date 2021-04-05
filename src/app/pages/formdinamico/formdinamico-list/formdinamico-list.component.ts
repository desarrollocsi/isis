import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormdinamicoService } from '../services/formdinamico.service';
import { IntermedaryService } from '../../../core/services/intermedary.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-formdinamico-list',
  templateUrl: './formdinamico-list.component.html',
  styleUrls: ['./formdinamico-list.component.css'],
})
export class FormdinamicoListComponent implements OnInit, OnDestroy {
  dataDynamic$: Observable<any>;
  dataDynamicRefresh$: Observable<any>;
  p: number = 1;
  subscription: Subscription;
  URL: string;
  checked: boolean = false;

  constructor(
    private FS: FormdinamicoService,
    private IS: IntermedaryService
  ) {}

  get ListDynamic() {
    return this.IS._route.pipe(
      take(1),
      tap((data: string) => (this.URL = data)),
      switchMap((data) => this.FS.getApiDynamic(data))
    );
  }

  ngOnInit(): void {
    this.getListdynamic();
    this.subscription = this.IS.refresh.subscribe((_) => this.getListdynamic());
  }

  onModal(status: boolean) {
    this.IS.getModal(status);
  }

  getListdynamic() {
    this.dataDynamic$ = this.ListDynamic;
  }

  onEdit(id: string) {
    this.IS.getDataDynamic(id);
  }

  onDelete(id: string) {
    this.FS.getApiDynamic(this.URL, 'DELETE', id).subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
