export class HistoriaData {
  public historia: string;
  public apellidoPaterno: string;
  public apellidoMaterno: string;
  public nombres: string;

  constructor(object: any) {
    this.historia = object.hc_numhis;
    this.apellidoPaterno = object.hc_apepat;
    this.apellidoMaterno = object.hc_apemat;
    this.nombres = object.hc_nombre;
  }

  get nombreCompleto() {
    return `${this.apellidoPaterno} ${this.apellidoMaterno} ${this.nombres}`;
  }
}
