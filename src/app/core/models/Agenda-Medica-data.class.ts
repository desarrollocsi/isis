export class AgendaMedicaData {
  public consultorio: string;
  public especialidad: string;
  public turno: string;
  public medico: string;

  constructor(object: any) {
    this.consultorio = object.consultorio.descripcion || '';
    this.especialidad = object.especialidad.descripcion || '';
    this.medico = object.nombre || '';
    this.turno = object.turno.descripcion || '';
  }
}
