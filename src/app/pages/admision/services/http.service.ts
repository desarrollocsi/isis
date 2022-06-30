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
  //URL: string = 'http://localhost:8080';
  URL: string = 'http://192.168.10.183:8080/';

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
      `${this.URL}/sitedsApi/consultaNombre`,
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
      })
    );
  }
  n;

  consultaCoberturas(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(
      `${this.URL}/sitedsApi/consultaCobertura`,
      this.parametersDynamic(data),
      { headers }
    );
  }
}
