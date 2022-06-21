export const PACIENTE = [
  {
    id: 1,
    paciente: 'CALVO VARGAS DORA LILIANA',
    primerNombre: 'DORA',
    segundoNombre: 'LILIANA',
    apellidoPaterno: 'CALVO',
    apellidoMaterno: 'VARGAS',
    documento: '40078058',
    acreditacion: {
      iafas: '20001',
      codigo: 1000,
      producto: 'PLANES MEDICOS',
      codigoAfiliado: 12345679,
      empresa: 'TERMOCHILCA SA',
      fechaVigencia: '2022-06-07',
    },
    citas: {
      fecha: '2022-06-07',
      hora: '13:00:00',
      medico: 'ABURTO PPPPP',
      especialidad: 'PEDIATRA',
      consultorios: 'CONSULTORIOS 5000',
    },
  },
  {
    id: 2,
    paciente: 'BEDOYA GUERRERO GINA GRIMALDINA',
    primerNombre: 'GINA',
    segundoNombre: 'GRIMALDINA',
    apellidoPaterno: 'BEDOYA',
    apellidoMaterno: 'GUERRERO',
    documento: '40098237',
    acreditacion: {
      iafas: '20002',
      codigo: 1000,
      producto: 'PLANES MEDICOS',
      codigoAfiliado: 9999999,
      empresa: 'TERMOCHILCA SA',
      fechaVigencia: '2022-06-07',
    },
    citas: {
      fecha: '2022-06-07',
      hora: '13:00:00',
      medico: 'ABURTO XXXXX',
      especialidad: 'PEDIATRA',
      consultorios: 'CONSULTORIOS 5000',
    },
  },
  {
    id: 3,
    paciente: 'BARRERA HERRERA ARACELLI IRENE',
    primerNombre: 'ARACELLI',
    segundoNombre: 'IRENE',
    apellidoPaterno: 'BARRERA',
    apellidoMaterno: 'HERRERA',
    documento: '76524899',
    acreditacion: {
      iafas: '40004',
      codigo: 1000,
      producto: 'PLANES MEDICOS',
      codigoAfiliado: 9999999,
      empresa: 'TERMOCHILCA SA',
      fechaVigencia: '2022-06-07',
    },
    citas: {
      fecha: '2022-06-07',
      hora: '13:00:00',
      medico: 'ABURTO XXXXX',
      especialidad: 'PEDIATRA',
      consultorios: 'CONSULTORIOS 5000',
    },
  },
];

export const DATA__ATENCION = [
  { codigo: 12, descripcion: 'AMENAZA DE ABORTO' },
  { codigo: 10, descripcion: 'COMPLICACIONES DEL EMBARAZO' },
  { codigo: 1, descripcion: 'CONSULTA AMBULATORIA' },
  { codigo: 11, descripcion: 'CONTROL DEL RECIEN NACIDO' },
  { codigo: 6, descripcion: 'CONTROL DE NIÑO SANO' },
  { codigo: 14, descripcion: 'CONTROL POST HOSPITALARIO' },
  { codigo: 9, descripcion: 'CONTROL POST NATAL' },
  { codigo: 8, descripcion: 'CONTROL PRE NATAL' },
  { codigo: 2, descripcion: 'EMERGENCIA MEDICA' },
  { codigo: 13, descripcion: 'EMERGENCIA OBSTETRICA' },
  { codigo: 3, descripcion: 'HOSPITALIZACION' },
  { codigo: 4, descripcion: 'MATERNIDAD' },
  { codigo: 15, descripcion: 'NUTRICIONISTA' },
  { codigo: 16, descripcion: 'PEDIATRICO' },
  { codigo: 7, descripcion: 'VACUNACION' },
];
