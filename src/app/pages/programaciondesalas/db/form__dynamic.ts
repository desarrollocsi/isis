export const formDynamic = {
  areaPreparaciones: [
    {
      label: 'SD',
      type: 'radio',
      value: 'SD',
    },
    {
      label: 'Recuperacion',
      type: 'radio',
      value: 'RE',
    },
    {
      label: 'Hospitalario',
      type: 'radio',
      value: 'HO',
    },
    {
      label: 'Emergencia',
      type: 'radio',
      value: 'EM',
    },
  ],
  estancias: [
    {
      label: 'ambulatorio',
      type: 'radio',
      value: 'AM',
    },
    {
      label: 'hospitalario',
      type: 'radio',
      value: 'HO',
    },
  ],
  equipoMedicos: [
    {
      label: 'MORCELADOR',
      type: 'checkbox',
      value: '001',
    },
    {
      label: 'MAYTATOT',
      type: 'checkbox',
      value: '002',
    },
  ],
  otros: [
    {
      label: 'emergenciasadasd',
      type: 'checkbox',
      value: '1',
      control: 'cq_es_emer',
    },
    {
      label: 'OrdenRqx',
      type: 'checkbox',
      value: '1',
      control: 'cq_orden_rqx',
    },
    {
      label: 'OrdenIQX',
      type: 'checkbox',
      value: '1',
      control: 'cq_orden_cq',
    },
    {
      label: 'EnfermeaNeo',
      type: 'checkbox',
      value: '1',
      control: 'cq_enfer',
    },
  ],
};
