export class Cobertura {
  public copago_fijo: string;
  public copago_variable: string;
  public cobertura: string;
  public numero_autorizacion: string;

  constructor({ CoPagoFijo, CoPagoVariable, CoTiCobertura, CoSubTiCobertura }) {
    this.cobertura = `${CoTiCobertura} ${CoSubTiCobertura}`;
    this.copago_fijo = CoPagoFijo;
    this.copago_variable = CoPagoVariable;
    this.numero_autorizacion = '123456789';
  }
}
