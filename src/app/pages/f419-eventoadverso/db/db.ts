export const perfilMenu = [
  {
    perfil: 'ADMIN',
    menu: [
      {
        nombre: 'Views',
        img: '../../../../assets/icons/view.png',
        method: null,
        status: true,
      },
      {
        nombre: 'Editar',
        img: '../../../../assets/icons/pen.png',
        method: 'onUpdate',
        status: true,
      },
      {
        nombre: 'Pendiente',
        img: '../../../../assets/icons/danger.png',
        method: 'onUpdateStatus',
        status: true,
        id: 1,
      },
      {
        nombre: 'En proceso',
        img: '../../../../assets/icons/process.png',
        method: 'onUpdateStatus',
        status: true,
        id: 2,
      },
      {
        nombre: 'Ejecutado',
        img: '../../../../assets/icons/check.png',
        method: 'onUpdateStatus',
        status: true,
        id: 3,
      },
    ],
  },
  {
    perfil: 'USUARIO',
    menu: [
      {
        nombre: 'Editar',
        img: '../../../../assets/icons/pen.png',
        method: 'onUpdate',
        status: true,
      },
    ],
  },
];
