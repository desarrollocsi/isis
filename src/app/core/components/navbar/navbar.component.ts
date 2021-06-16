import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthStorageService, IntermedaryService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private AST: AuthStorageService,
    private IS: IntermedaryService,
    private router: Router
  ) {}

  menus$: Observable<any>;
  submenus$: Observable<any>;
  submenu = false;
  usuario: string;

  ngOnInit(): void {
    this.onMenu();
    this.onUsuario();
  }

  onUsuario() {
    this.usuario = this.AST.User;
  }

  onMenu() {
    this.menus$ = this.IS._menus.pipe(
      tap(console.log),
      switchMap((id: string) => this.AST.getMenu(id))
    );
  }

  onSubmenu(id: number) {
    this.submenus$ = this.AST.getSubmenu(id);
  }

  onRoute(route: any) {
    const { nombres, tabla } = route;
    this.IS.getRoute({ nombres, tabla });
  }

  logout() {
    this.AST.clearLocalstorage();
    this.IS.getMenus(null);
    this.router.navigate(['']);
  }
}
