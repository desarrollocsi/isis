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
      title: '¡¡Bien hecho!!',
      text: `${message}`,
      timer: 1500,
      showConfirmButton: true,
    });
  }

  MessageInfo(message: string) {
    Swal.fire({
      icon: 'info',
      html: `<h1>${message}</h1>`,
      showConfirmButton: true,
    });
  }

  MessageError(message: string) {
    Swal.fire({
      icon: 'error',
      html: `${message}`,
      showConfirmButton: true,
    });
  }

  MessageConfirm(data: any, api: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.updateStatusIncidencia(data).subscribe(
          (data) => this.MessageSucces(data.message),
          (error) => this.MessageError(error)
        );
      }
    });
  }
}
