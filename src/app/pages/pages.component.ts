import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStorageService } from '../core/services';

@Component({
  selector: 'app-pages',
  template: `
    <app-navbar [menus]="menus$ | async"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class PagesComponent implements OnInit {
  menus$: Observable<any>;
  constructor(private AST: AuthStorageService) {}

  ngOnInit(): void {
    this.onMenu(this.AST.modulos);
  }

  onMenu(data: any) {
    this.menus$ = of(data).pipe(
      switchMap((id: string) => this.AST.getMenu(id))
    );
  }
}
