export class DatosPacientes {
  public historia: number;
  public paciente: string;
  public sexo: string;
  public edad: string;

  constructor(object: any) {
    this.historia = object.hc_numhis || null;
    this.paciente =
      `${object.hc_apepat} ${object.hc_apemat} ${object.hc_nombre}` || null;
    this.sexo = object.sexo || null;
    this.edad = object.edad || null;
  }
}
