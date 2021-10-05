import { formDynamic } from '../db/form__dynamic';
import * as moment from 'moment';

export const formatearFechaDescripcion = (fecha: string) =>
  moment(fecha, 'YYYY-MM-DD').format('LL');

export const formatearFechaDmy = (fecha: string) =>
  moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');

export const formatearFechaYmd = (fecha: string) =>
  moment(fecha, 'YYYY-MM-DD').format('YYYY-MM-DD');

export const formatearFechaHora = (fecha: string, hora: string) =>
  moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm:ss').format(
    'YYYY-MM-DD HH:mm:ss'
  );

export const formatearHora = (hora: string) =>
  moment(hora, 'YYYY-MM-DD HH:mm:ss.SSS').format('HH:mm');

export const obtenerIndiceProgramacionSala = ({ data, hora }) =>
  data.findIndex((data: any) => data.hora === hora);

export const obtenerIndice = ({ data, codigoDeEquipoMedico }) =>
  data.findIndex(({ de_codequi }) => de_codequi === codigoDeEquipoMedico);

export const transformarData = (data: any) => {
  data['cq_hoinpr'] = formatearFechaHora(data.cq_fecha, data.cq_hoinpr);
  data['cq_hofipr'] = formatearFechaHora(data.cq_fecha, data.cq_hofipr);
  data['cq_fecha'] = formatearFechaHora(data.cq_fecha, '00:00:00');
  return data;
};

export const modificarDataDeProgramacionDeSalas = (data: any) => {
  data['cq_fecha'] = formatearFechaYmd(data.cq_fecha);
  data['cq_hoinpr'] = formatearHora(data.cq_hoinpr);
  data['cq_hofipr'] = formatearHora(data.cq_hofipr);
  return data;
};

export const tiempoSeleccionado = ({ minuto, hora, checked }) => {
  const tiempo = minuto / 3 / 10;
  return Object.keys([...Array(tiempo + 1)]).map((minutos: string) => {
    return {
      hora: moment(hora, 'HH:mm:ss')
        .add(30 * +minutos, 'm')
        .format('HH:mm:ss'),
      estado: checked,
    };
  });
};

export const generarObjectHoraDeProgramacion = (
  data: any,
  numeroDeSala: string,
  fecha: any
) => {
  return {
    cq_fecha: fecha,
    sa_codsal: numeroDeSala,
    cq_hoinpr: data[data.length - 1].hora,
    cq_hofipr: data[0].hora,
  };
};

export const isCheckbox = (keys: string, codigo: string) => {
  let indice = formDynamic[keys].findIndex(
    ({ value, control }) => value === codigo || control === codigo
  );
  formDynamic[keys][indice]['isChecked'] = true;
};
