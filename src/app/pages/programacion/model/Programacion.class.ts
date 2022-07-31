import * as moment from 'moment';

export class Programacion {
  public pr_fecha: string;
  public pr_servicio: string;
  public pr_consultorio: string;
  public pr_medico: string;
  public pr_turno: string;
  public pr_numero: string;

  constructor({
    pr_numero,
    pr_fecha,
    pr_servicio,
    pr_consultorio,
    pr_medico,
    pr_turno,
  }) {
    this.pr_numero = pr_numero;
    this.pr_fecha = moment(pr_fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
    this.pr_servicio = pr_servicio;
    this.pr_consultorio = pr_consultorio;
    this.pr_medico = pr_medico;
    this.pr_turno = pr_turno;
  }
}
