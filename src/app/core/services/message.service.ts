import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  MessageSucces(info: string) {
    const message = `<h2>${info}</h2>`;
    Swal.fire({
      icon: 'success',
      html: message,
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
