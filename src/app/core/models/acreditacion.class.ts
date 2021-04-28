export class Acreditacion {
  public iafas: string;
  public plan: string;

  constructor(object: any) {
    this.iafas = object.pl_desaseg;
    this.plan = object.tipoaseg.trim();
  }
}
