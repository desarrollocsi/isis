import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {
  AuthStorageService,
  IntermedaryService,
  MessageService,
} from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() menus: any;
  constructor(
    private AST: AuthStorageService,
    private IS: IntermedaryService,
    private router: Router,
    private messageService: MessageService
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
      switchMap((id: any) => this.AST.getMenu(id))
    );
  }

  onSubmenu(id: number) {
    this.submenus$ = this.AST.getSubmenu(id);
  }

  onRoute({ nombres, tabla }) {
    this.IS.getRoute({ nombres, tabla });
  }

  logout() {
    const PARAMENTS__DYNAMIC = {
      data: null,
      title: '¿Desea cerrar session?',
      icon: 'info',
      buttonText: 'OK',
      cancelButton: true,
      key: 'LOGOUT',
      api: null,
    };

    this.messageService.MessageConfirm(PARAMENTS__DYNAMIC);
  }
}
