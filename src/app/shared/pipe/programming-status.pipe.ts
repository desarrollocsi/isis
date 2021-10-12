import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programmingStatus',
})
export class ProgrammingStatusPipe implements PipeTransform {
  transform(value: string, { cq_indrep }: { cq_indrep: string }): string {
    const reprogramacion = cq_indrep === '1' ? 'Reprogramado' : null;

    const STATUS = {
      '0': 'Anulado',
      '1': 'Programado',
      '2': 'Ejecutado',
      '3': 'Suspendida',
    };

    return reprogramacion || STATUS[value];
  }
}
