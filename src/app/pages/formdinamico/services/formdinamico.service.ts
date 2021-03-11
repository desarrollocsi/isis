import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormdinamicoService {
  constructor(private http: HttpClient) {}

  getApiFormDynamic() {
    return this.http.get(`http://192.168.10.144:8002/formulario`);
  }

  getApiDynamic(URL?: string, type?: string, data?: any) {
    switch (type) {
      case 'GET': {
        return this.http.get(`http://192.168.10.144:8002${URL}/${data.codigo}`);
      }
      case 'POST': {
        return this.http.post(`http://192.168.10.144:8002${URL}/`, data);
      }
      case 'PUT': {
        return this.http.put(
          `http://192.168.10.144:8002${URL}/${data.codigo}`,
          data
        );
      }
      case 'DELETE': {
        return this.http.delete(
          `http://192.168.10.144:8002${URL}/${data.codigo}`
        );
      }
      default: {
        return this.http.get(`http://192.168.10.144:8002${URL}/`);
      }
    }
  }
}
