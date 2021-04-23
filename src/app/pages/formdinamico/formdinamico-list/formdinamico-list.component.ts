import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FormdinamicoService } from '../services/formdinamico.service';

import { IntermedaryService, AuthStorageService } from '../../../core/services';

@Component({
  selector: 'app-formdinamico-list',
  templateUrl: './formdinamico-list.component.html',
  styleUrls: ['./formdinamico-list.component.css'],
})
export class FormdinamicoListComponent implements OnInit, OnDestroy {
  @Input() lists: any;

  dataDynamic$: Observable<any>;
  dataDynamicRefresh$: Observable<any>;

  p: number = 1;
  URL: string;
  checked: boolean = false;
  edit: boolean = false;

  private readonly unsubscribe$: Subject<void> = new Subject();
  constructor(
    private FS: FormdinamicoService,
    private IS: IntermedaryService,
    private AS: AuthStorageService
  ) {}

  get route() {
    return this.IS._route;
  }

  get usuario(): string {
    return this.AS.User;
  }

  ngOnInit(): void {
    this.route.pipe(take(1)).subscribe((data) => {
      this.URL = data;
    });
  }
  openModalSave() {
    this.IS.modal.next();
    this.IS.methodPost.next();
  }

  onEdit(id: any) {
    this.openModalSave();
    this.FS.getApiDynamic(this.URL, 'GET', id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.IS.getDataId(Object.assign(data, { usuario: this.usuario }));
        this.IS.methodPut.next();
      });
  }

  onDelete(id: string) {
    this.FS.getApiDynamic(this.URL, 'DELETE', id).subscribe(console.log);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
