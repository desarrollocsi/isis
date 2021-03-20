import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IntermedaryService } from '../../../core/services/intermedary.service';
import { AuthStorageService } from '../../../core/services/auth-storage.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormdinamicoService {
  constructor(
    private http: HttpClient,
    private IS: IntermedaryService,
    private AS: AuthStorageService,
    private router: Router
  ) {}

  isValidacionData(data: any) {
    return data ? true : false;
  }

  formGroup(form: any) {
    if (!this.isValidacionData(form)) {
      this.router.navigate(['home']);
    }

    const group: any = {};
    const user = this.AS.User;
    form.formulariod.map((form: any) => {
      const { ruta_api, options } = form;
      if (ruta_api) {
        this.getApiDynamic({ nombres: ruta_api })
          .pipe(take(1))
          .subscribe((data: any) => {
            data.map((data: any) => {
              options.push(data);
            });
          });
      }

      const value = form.label === 'usuario' ? user : form.value;
      group[form.key] = new FormControl(value);
    });
    return new FormGroup(group);
  }

  getApiFormDynamic(data: any) {
    if (!this.isValidacionData(data)) {
      this.router.navigate(['home']);
    }

    return this.http.get(
      `http://192.168.10.144:8002/formulario/${data.tabla}/`
    );
  }

  getApiDynamic(URL?: any, type?: string, data?: any) {
    if (!this.isValidacionData(URL)) {
      this.router.navigate(['home']);
    }

    switch (type) {
      case 'GET': {
        return this.http.get(
          `http://192.168.10.144:8002/${URL.nombres}/${data}`
        );
      }
      case 'POST': {
        return this.http
          .post(`http://192.168.10.144:8002/${URL.nombres}/`, data)
          .pipe(tap((_) => this.IS.refresh.next()));
      }
      case 'PUT': {
        return this.http
          .put(`http://192.168.10.144:8002/${URL.nombres}/${data.codigo}`, data)
          .pipe(tap((_) => this.IS.refresh.next()));
      }
      case 'DELETE': {
        return this.http
          .delete(`http://192.168.10.144:8002/${URL.nombres}/${data}`)
          .pipe(tap((_) => this.IS.refresh.next()));
      }
      default: {
        return this.http.get(`http://192.168.10.144:8002/${URL.nombres}/`);
      }
    }
  }
}
