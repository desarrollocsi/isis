import { Component, OnInit } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { IntermedaryService } from '../../services/intermedary.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private AST: AuthStorageService,
    private IS: IntermedaryService
  ) {}

  menus$: Observable<any>;
  submenus$: Observable<any>;
  submenu = false;

  ngOnInit(): void {
    this.menus$ = this.IS.dataMenu.pipe(
      switchMap((id: number) => this.AST.getMenu(id))
    );
  }

  onSubmenu(id: number) {
    this.submenus$ = this.AST.getMenu(id);
  }

  onRoute(route: string) {
    const url = route.substring(14);
    this.IS.getRoute(url);
  }
}
