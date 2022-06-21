import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { PACIENTE } from '../data';
import { WebserviceSualudNombre } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private parametersDynamic(data: any) {
    let params = new URLSearchParams();

    for (const key in data) {
      params.set(`${key}`, data[key]);
    }

    return params.toString();
  }

  getDataPaciente({ id }): Observable<any> {
    return of(PACIENTE.find((value) => value.id === id));
  }

  consultaNombre(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(
      `http://localhost:8080/sitedsApi/consultaNombre`,
      this.parametersDynamic(new WebserviceSualudNombre(data)),
      { headers: headers }
    );
  }

  getPaciente(data: any) {
    return combineLatest([
      this.consultaNombre(data),
      this.getDataPaciente(data),
    ]).pipe(
      map(([data, datasPacientes]) => {
        return { data, datasPacientes };
      }),
      tap(console.log)
    );
  }

  consultaCoberturas(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(
      `http://localhost:8080/sitedsApi/consultaCobertura`,
      this.parametersDynamic(data),
      { headers }
    );
  }
}
