import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IntermedaryService } from '../../../core/services';

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
  constructor(
    private http: HttpClient,
    private IS: IntermedaryService,
  ) {}

  public getEstado(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/estado`);
  }
  public getResultado(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/resultado`);
  }
  public getEtapa(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/etapa`);
  }
  public getServicio() {
    return this.http.get(`${environment.apiUrl}/servicio`);
  }
  public getClasificacion(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/clasificacion`);
  }
  public getMedioRecepcion(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/mediorecepcion`);
  }
  public getReclamos(buscar: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/reclamos/lista/?search=${buscar}`
    );
  }
  public getTrama(periodo: string) {
    return this.http.get(`${environment.apiUrl}/tramas/?periodo=${periodo}`);
  }

  apidynamic(comp: string, verb: string, data: any) {
    const API__DYNAMIC = {
      GET: this.http
        .get(`${environment.apiUrl}/${comp}/${data}`, data)
        .pipe(tap((_) => this.IS.refresh.next())),
      PUT: this.http
        .put(`${environment.apiUrl}/${comp}/${data.re_cod}`, data)
        .pipe(tap((_) => this.IS.refresh.next())),
      POST: this.http
        .post(`${environment.apiUrl}/${comp}/0`, data)
        .pipe(tap((_) => this.IS.refresh.next())),
    };

    return API__DYNAMIC[verb];
  }
}
