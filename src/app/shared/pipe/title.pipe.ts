import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(descripcion: string, ...args: unknown[]): string {
    return `${descripcion.charAt(0).toLocaleUpperCase()}${descripcion
      .slice(1)
      .toLocaleLowerCase()}`;
  }
}
