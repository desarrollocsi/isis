import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthStorageService } from './auth-storage.service';
import { IntermedaryService } from './intermedary.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private AST: AuthStorageService,
    private IS: IntermedaryService,
    private router: Router
  ) {}

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

  // MessageConfirm(data: any, api: any) {
  MessageConfirm({ data, title, icon, buttonText, cancelButton, key, api }) {
    Swal.fire({
      title,
      text: '',
      icon,
      showCancelButton: cancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: buttonText,
    }).then((result) => {
      if (result.isConfirmed) {
        const METHOD_DYNAMIC = {
          STATUS: () => this.updateStatus(api, data),
          LOGOUT: () => this.logout(),
        };

        METHOD_DYNAMIC[key]();
      }
    });
  }

  updateStatus(api: any, data: any) {
    api.updateStatusIncidencia(data).subscribe(
      (data: any) => this.MessageSucces(data.message),
      (error: any) => this.MessageError(error)
    );
  }

  logout() {
    this.AST.clearLocalstorage();
    this.IS.getMenus(null);
    this.router.navigate(['']);
  }
}
