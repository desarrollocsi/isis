import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../services/';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanLoad {
  constructor(private AUS: AuthStorageService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const rol = this.AUS.rol;
    if (rol === 'SECRETARIA') {
      this.router.navigate(['home/agendasecretaria']);
      return false;
    }

    return true;
  }
}
