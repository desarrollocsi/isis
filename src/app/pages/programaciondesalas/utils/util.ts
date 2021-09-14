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

export const modificarDataDeProgramacionDeSalas = (data: any) => {
  data['cq_fecha'] = moment(data.cq_fecha, 'YYYY-MM-DD').format('YYYY-MM-DD');
  data['cq_hoinpr'] = moment(data.cq_hoinre, 'YYYY-MM-DD HH:mm:ss.SSS').format(
    'HH:mm'
  );
  data['cq_hofipr'] = moment(data.cq_hofipr, 'YYYY-MM-DD HH:mm:ss.SSS').format(
    'HH:mm'
  );

  return data;
};
