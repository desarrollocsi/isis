import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStorageService, IntermedaryService } from 'src/app/core/services';

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
    this.onMenu();
  }

  onMenu() {
    this.menus$ = this.IS._menus.pipe(
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
}
