export const perfilMenu = [
  {
    perfil: 'ADMIN',
    menu: [
      {
        nombre: 'Views',
        icon: '../../../../assets/icons/view.png',
        method: 'onUpdate',
        action: 'VIEWS',
        status: true,
      },
      {
        nombre: 'Editar',
        icon: '../../../../assets/icons/pen.png',
        method: 'onUpdate',
        action: 'EDIT',
        status: true,
      },
      {
        nombre: 'Pendiente',
        icon: '../../../../assets/icons/danger.png',
        method: 'onUpdateStatus',
        status: true,
        id: 1,
      },
      {
        nombre: 'En proceso',
        icon: '../../../../assets/icons/process.png',
        method: 'onUpdateStatus',
        status: true,
        id: 2,
      },
      {
        nombre: 'Ejecutado',
        icon: '../../../../assets/icons/check.png',
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
        nombre: 'Views',
        icon: '../../../../assets/icons/view.png',
        method: 'onUpdate',
        action: 'VIEWS',
        status: true,
      },
      {
        nombre: 'Editar',
        icon: '../../../../assets/icons/pen.png',
        method: 'onUpdate',
        action: 'EDIT',
        status: true,
      },
    ],
  },
];
