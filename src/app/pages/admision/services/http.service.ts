import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//
import { PACIENTE } from '../data';

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
      this.parametersDynamic(data),
      { headers: headers }
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
