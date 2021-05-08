import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistoriaService {
  constructor(private http: HttpClient) {}

  postGenerarHistoria(data: any) {
    return this.http.post('http://192.168.10.144:8002/historias/', data);
  }
}
