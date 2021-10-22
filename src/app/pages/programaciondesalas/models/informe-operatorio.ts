import { formatearHora, formatearFechaDescripcion } from '../utils/';
import { AuthStorageService } from '../../../core/services';

export class InformeOperatorio {
  public historia: number;
  public paciente: string;
  public edad: string;
  public horaInicio: string;
  public horaFin: string;
  public fecha: string;
  public detalles: [];

  constructor({
    cq_numhis,
    cq_paciente,
    cq_edad,
    cq_hoinpr,
    cq_hofipr,
    cq_fecha,
    detalle,
  }) {
    this.historia = +cq_numhis;
    this.paciente = cq_paciente;
    this.edad = cq_edad;
    this.horaInicio = cq_hoinpr;
    this.horaFin = cq_hofipr;
    this.fecha = cq_fecha;
    this.detalles = detalle;
  }

  get inicioDeProgramacion() {
    return formatearHora(this.horaInicio);
  }

  get finDeProgramacion() {
    return formatearHora(this.horaFin);
  }

  get fechaDeProgramacion() {
    return formatearFechaDescripcion(this.fecha);
  }
}
