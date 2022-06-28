import { Injectable } from '@angular/core';
import { Observable, Subject, filter, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IntermedaryService, AuthStorageService } from '../../../core/services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PagoConsumoService {
  constructor(
    private http: HttpClient,
    private IS: IntermedaryService,
    private AS: AuthStorageService,
    private router: Router
  ) {}
  
  public getServicio() {
    return this.http.get(`${environment.apiUrl}/servicio`);
  }
  public getClasificacion(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/clasificacion`);
  }
  public getMedioRecepcion(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/mediorecepcion`);
  }
  public getFormaPago(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/formapago`);
  }

  _modal = new Subject<void>();
  _refresh = new Subject<void>();
  modal = new Subject<boolean>();
  _modal2 = this.modal.asObservable();
  
  setModal(status: boolean) {
    this.modal.next(status);
  }
  get openModal() {
    return this._modal;
  }
  private dataFPago = new BehaviorSubject<any>(null);
  _dataFPago = this.dataFPago
    .asObservable()
    .pipe(filter((data) => data !== null));

  setDataFPago(data: any) {
    this.dataFPago.next(data);
  }
}
