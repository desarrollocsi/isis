import * as moment from 'moment';

export class ConsultasAtenciones {
  public historia: number;
  public hora: string;
  public consultorio: string;
  public medico: string;
  public fecha: string;

  constructor(object: any) {
    this.historia = +object.ci_numhist || null;
    this.hora = object.ci_horatencion || '';
    this.consultorio = object.consultorio || '';
    this.medico = object.medico || '';
    this.fecha = moment(object.ci_fechacita).format('YYYY-MM-DD') || '';
  }
}
