import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(datosDelPaciente: any, numeroDeHistoria: number): any[] {
    if (!numeroDeHistoria) return datosDelPaciente;

    return datosDelPaciente.filter(
      (resp: any) => resp.historia === numeroDeHistoria
    );
  }
}
