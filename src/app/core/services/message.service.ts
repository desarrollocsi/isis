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

  MessageInfo(info: string) {
    const message = `<h1>${info}</h1>`;
    Swal.fire({
      icon: 'info',
      html: message,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  MessageError(info: string) {
    const message = `<h1>${info}</h1>`;
    Swal.fire({
      icon: 'error',
      html: message,
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
