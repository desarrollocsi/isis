import { Component, OnInit } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { filter, tap, map, first } from 'rxjs/operators';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private AST: AuthStorageService) {}

  menus$: Observable<any>;
  submenus$: Observable<any>;
  submenu = false;

  ngOnInit(): void {
    this.menus$ = of(this.AST.getMenu()).pipe(
      map((menu: any) => menu.filter((menu: any) => menu.nivel !== 0))
    );

    fromEvent(document, 'Mouse').subscribe(console.log);
  }

  onSubmenu(id: Number) {
    this.submenus$ = of(this.AST.getMenu()).pipe(
      map((submenu: any) =>
        submenu.filter((submenu: any) => submenu.padre === id)
      )
    );
  }
}
