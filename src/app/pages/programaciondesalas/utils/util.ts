import { formDynamic } from '../db/form__dynamic';
import * as moment from 'moment';

export const formatearFechaDescripcion = (fecha: string) =>
  moment(fecha, 'YYYY-MM-DD').format('LL');

export const formatearFechaDmy = (fecha: string) =>
  moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');

export const formatearFechaYmd = (fecha: string) =>
  moment(fecha, 'YYYY-MM-DD').format('YYYY-MM-DD');

export const formatearFechaHora = (fecha: string, hora: string) =>
  fecha && hora
    ? moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm:ss').format(
        'YYYY-MM-DD HH:mm:ss'
      )
    : null;

export const formatearHora = (hora: string) =>
  hora ? moment(hora, 'YYYY-MM-DD HH:mm:ss.SSS').format('HH:mm') : null;

export const obtenerIndiceProgramacionSala = ({ data, hora }) =>
  data.findIndex((data: any) => data.hora === hora);

export const obtenerIndice = ({ data, codigoDeEquipoMedico }) =>
  data.findIndex(({ de_codequi }) => de_codequi === codigoDeEquipoMedico);

export const transformarData = (data: any) => {
  data['cq_hoinpr'] = formatearFechaHora(data.cq_fecha, data.cq_hoinpr) || null;
  data['cq_hofipr'] = formatearFechaHora(data.cq_fecha, data.cq_hofipr) || null;
  data['cq_hofiej'] = formatearFechaHora(data.cq_fecha, data.cq_hofiej) || null;
  data['cq_hofire'] = formatearFechaHora(data.cq_fecha, data.cq_hofire) || null;
  data['cq_hoinej'] = formatearFechaHora(data.cq_fecha, data.cq_hoinej) || null;
  data['cq_hoinre'] = formatearFechaHora(data.cq_fecha, data.cq_hoinre) || null;
  data['cq_fecha'] = formatearFechaHora(data.cq_fecha, '00:00:00');
  return data;
};

export const modificarDataDeProgramacionDeSalas = (data: any) => {
  data['cq_fecha'] = formatearFechaYmd(data.cq_fecha);
  data['cq_hoinpr'] = formatearHora(data.cq_hoinpr) || null;
  data['cq_hofipr'] = formatearHora(data.cq_hofipr) || null;
  data['cq_hofiej'] = formatearHora(data.cq_hofiej) || null;
  data['cq_hofire'] = formatearHora(data.cq_hofire) || null;
  data['cq_hoinej'] = formatearHora(data.cq_hoinej) || null;
  data['cq_hoinre'] = formatearHora(data.cq_hoinre) || null;
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

export const isValueCheckbox = (value: string) =>
  value === '1' ? true : false;
