export class ProgramacionForm {
  public pr_fecha: string;
  public pr_servicio: string;
  public pr_consultorio: string;
  public pr_medico: string;
  public pr_turno: string;
  public pr_numero: string;

  constructor(object: any) {
    this.pr_numero = object.pr_numero;
    this.pr_fecha = new Date(object.pr_fecha).toDateString();
    this.pr_servicio = object.pr_servicio;
    this.pr_consultorio = object.pr_consultorio;
    this.pr_medico = object.pr_medico;
    this.pr_turno = object.pr_turno;
  }
}
