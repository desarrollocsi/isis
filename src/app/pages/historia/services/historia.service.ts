import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoriaService {
  constructor(private http: HttpClient) {}

  getSearchHistoria(historia: string) {
    return this.http.get(
      `${environment.apiUrl}/historiasbuscar?search=${historia}`
    );
  }

  postGenerarHistoria(data: any) {
    return this.http.post(`${environment.apiUrl}/historias/`, data);
  }

  apiDinamic(verbHttp: string, data: any) {
    console.log(data);
    switch (verbHttp) {
      case 'POST': {
        return this.http.post(`${environment.apiUrl}/historias/`, data);
      }
      case 'PUT': {
        return this.http.put(
          `${environment.apiUrl}/historias/${data.hc_numhis}`,
          data
        );
      }
    }
  }

  /**********************/

  private data = new Subject<any>();
  _data = this.data.asObservable();

  getData(data: any) {
    this.data.next(data);
  }
}
