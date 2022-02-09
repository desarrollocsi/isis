import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class PerfilGuard implements CanActivateChild {
  constructor(private router: Router, private AST: AuthStorageService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const rol = this.AST.rol;

    const ROUTE_ROL = {
      SECRETARIA: 'home/agendasecretaria',
      SUPERADMIN: 'home/agendamedica',
    };

    this.router.navigate([ROUTE_ROL[rol]]);

    return true;
  }
}
