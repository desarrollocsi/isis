import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programmingStatus',
})
export class ProgrammingStatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const STATUS = {
      '0': 'Anulado',
      '1': 'Programado',
      '2': 'Ejecutado',
    };

    return STATUS[value];
  }
}
