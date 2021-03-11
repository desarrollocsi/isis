import { Component, OnInit } from '@angular/core';
import { FormdinamicoService } from '../services/formdinamico.service';
import { IntermedaryService } from '../../../core/services/intermedary.service';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-formdinamico-list',
  templateUrl: './formdinamico-list.component.html',
  styleUrls: ['./formdinamico-list.component.css'],
})
export class FormdinamicoListComponent implements OnInit {
  dataDynamic$: Observable<any>;
  p: number = 1;
  constructor(
    private FS: FormdinamicoService,
    private IS: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.dataDynamic$ = this.IS._route.pipe(
      tap(console.log),
      take(1),
      switchMap((data) => this.FS.getApiDynamic(data))
    );
  }
}
