import { Pipe, PipeTransform } from '@angular/core';
import { AuthStorageService } from '../../core/services';

@Pipe({
  name: 'personal',
})
export class PersonalPipe implements PipeTransform {
  constructor(private AuthStorageService: AuthStorageService) {}

  transform(codigoDelPersonal: unknown, ...args: unknown[]): unknown {
    const DATA_DEFAULT = '(No se asigno)';
    let index = this.AuthStorageService.personal.findIndex(
      (data) => data.codigo === codigoDelPersonal
    );

    return codigoDelPersonal
      ? this.AuthStorageService.personal[index].nombre
      : DATA_DEFAULT;
  }
}
