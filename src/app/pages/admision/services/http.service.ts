import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  parametersDynamic(data: any) {
    let params = new URLSearchParams();

    for (const key in data) {
      params.set(`${key}`, data[key]);
    }

    return params.toString();
  }

  consultaNombre(data: any): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(
      `http://localhost:8080/sitedsApi/consultaNombre`,
      this.parametersDynamic(data),
      { headers: httpHeaders }
    );
  }
}
