export class WebserviceSualudNombre {
  public codigoIafas: string;
  public nombres: string;
  public apellidoPaternoOdni: string;
  public apellidoMaterno: string;

  constructor({
    primerNombre,
    segundoNombre,
    apellidoPaterno,
    apellidoMaterno,
    documento,
    acreditacion,
  }) {
    this.codigoIafas = acreditacion.iafas;
    this.apellidoMaterno = apellidoMaterno;
    this.apellidoPaternoOdni = apellidoPaterno;
    this.nombres = `${primerNombre} ${segundoNombre}`;
  }
}
