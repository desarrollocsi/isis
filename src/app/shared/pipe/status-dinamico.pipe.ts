import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusDinamico',
})
export class StatusDinamicoPipe implements PipeTransform {
  transform(key: string, parameter: string): string {
    const TABLA__MAESTRA = [
      {
        title: 'status',
        opcion: {
          '1': 'PENDIENTE',
          '2': 'EN PROCESO',
          '3': 'EJECUTADO',
        },
      },
      {
        title: 'turno',
        opcion: {
          '1': 'MAÑANA',
          '2': 'TARDE',
          '3': 'NOCHE',
        },
      },
    ];

    const { opcion } =
      TABLA__MAESTRA[
        TABLA__MAESTRA.findIndex(({ title }) => title === parameter)
      ];

    return opcion[key];
  }
}
