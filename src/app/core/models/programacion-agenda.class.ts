export class ProgramacionAgenda {
  public codigo: string;
  public descripcion: string;

  constructor(object: any) {
    this.codigo = object.especialidad.codigo || null;
    this.descripcion = object.especialidad.descripcion;
  }
}
