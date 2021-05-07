export class CieForm {
  public idcie: string;
  public tdx: string;

  constructor(object: any) {
    this.idcie = object.id || object.idcie;
    this.tdx = 'PRESUNTIVO';
  }
}
