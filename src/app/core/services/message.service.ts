import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  MessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      html: `<h2>${message}</h2>`,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  MessageInfo(message: string) {
    Swal.fire({
      icon: 'info',
      html: `<h1>${message}</h1>`,
      timer: 1000,
      showConfirmButton: false,
    });
  }

  MessageError(info: string) {
    Swal.fire({
      icon: 'error',
      html: `<h1>${info}</h1>`,
      // timer: 2500,
      showConfirmButton: true,
    });
  }
}
