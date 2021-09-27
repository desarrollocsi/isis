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
      isChecked: false,
    },
    {
      label: 'MAYTATOT',
      type: 'checkbox',
      value: '002',
      isChecked: false,
    },
  ],
  otros: [
    {
      label: 'emergencia',
      type: 'checkbox',
      value: '1',
      control: 'cq_es_emer',
      isChecked: false,
    },
    {
      label: 'OrdenRqx',
      type: 'checkbox',
      value: '1',
      control: 'cq_orden_rqx',
      isChecked: false,
    },
    {
      label: 'OrdenIQX',
      type: 'checkbox',
      value: '1',
      control: 'cq_orden_cq',
      isChecked: false,
    },
    {
      label: 'EnfermeaNeo',
      type: 'checkbox',
      value: '1',
      control: 'cq_enfer',
      isChecked: false,
    },
  ],
  gasas: [
    {
      label: 'Completo',
      value: 'C',
      control: 'cq_contgas',
      isChecked: false,
    },
    {
      label: 'Incompleto',
      value: 'I',
      control: 'cq_contgas',
      isChecked: false,
    },
    {
      label: 'N/A',
      value: 'N',
      control: 'cq_contgas',
      isChecked: false,
    },
  ],
};
