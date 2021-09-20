import * as moment from 'moment';
import { formatearFechaDmy } from '../utils/util';

export class Paciente {
  public historia: number;
  public apellidoPaterno: string;
  public apellidoMaterno: string;
  public mombreCompleto: string;
  public fechaDeNacimiento: string;
  public sexo: string;

  constructor({
    hc_numhis,
    hc_apepat,
    hc_apemat,
    hc_nombre,
    hc_fecnac,
    hc_sexo,
  }) {
    this.historia = +hc_numhis || null;
    this.apellidoPaterno = hc_apepat || '';
    this.apellidoMaterno = hc_apemat || '';
    this.mombreCompleto = hc_nombre || '';
    this.fechaDeNacimiento = formatearFechaDmy(hc_fecnac) || '';
    this.sexo = hc_sexo || '';
  }

  get nombreCompletoDelPaciente() {
    return `${this.apellidoPaterno} ${this.apellidoMaterno} ${this.mombreCompleto}`;
  }

  get edad() {
    return moment().diff(this.fechaDeNacimiento, 'years');
  }
}
