import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programmingStatus',
})
export class ProgrammingStatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const STATUS = {
      '0': 'Anulado',
      '1': 'Programado',
      '2': 'Ejecutado',
      '3': 'Suspendida',
    };

    return STATUS[value];
  }
}
