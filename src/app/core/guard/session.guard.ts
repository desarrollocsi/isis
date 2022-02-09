import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthStorageService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanLoad {
  constructor(private AUS: AuthStorageService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const auth = this.AUS.ValidacionUsuario;
    console.log(auth);
    // if (!auth) {
    //   //   return true;
    //   this.router.navigate(['modulos']);
    //   return false;
    // }
    // this.router.navigate(['modulos']);
    //  this.router.navigate(['modulos']);
    return true;
  }
}
