export class ProgramacionAgenda {
  public codigo: string;
  public descripcion: string;

  constructor(object: any) {
    this.codigo = object.codigo || null;
    this.descripcion = object.descripcion || null;
  }
}
