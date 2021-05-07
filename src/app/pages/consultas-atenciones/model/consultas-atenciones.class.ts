import * as moment from 'moment';

export class ConsultasAtenciones {
  public historia: number;
  public hora: string;
  public consultorio: string;
  public medico: string;
  public fecha: string;
  public status: boolean;
  public paciente: string;

  constructor(object: any) {
    this.historia = +object.ci_numhist || null;
    this.hora = object.ci_horatencion || '';
    this.consultorio = object.consultorio || '';
    this.medico = object.medico || '';
    this.fecha = moment(object.ci_fechacita).format('DD-MM-YYYY') || '';
    this.paciente = object.paciente || '';
    this.status = true;
  }
}
