import * as moment from 'moment';

export const calculoDeHora = ({ hora, tiempo, fecha }) => {
  let fechaHoraInicio = moment(
    `${fecha} ${hora}`,
    'YYYY-MM-DD HH:mm:ss'
  ).format('YYYY-MM-DD HH:mm:ss');

  let fechaHoraFin = moment(fechaHoraInicio)
    .add(tiempo, 'm')
    .format('YYYY-MM-DD HH:mm:ss');

  return {
    cq_hoinpr: fechaHoraInicio,
    cq_hofipr: fechaHoraFin,
  };
};

export const obtenerIndice = ({ data, codigoDeEquipoMedico }) => {
  return data.findIndex(({ codigo }) => codigo === codigoDeEquipoMedico);
};
