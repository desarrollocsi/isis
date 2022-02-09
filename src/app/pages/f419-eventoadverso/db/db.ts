import * as moment from 'moment';

export const perfilMenu = [
  {
    perfil: 'SUPERADMIN',
    menu: [
      {
        nombre: 'Views',
        icon: 'assets/icons/view.png',
        method: 'onUpdate',
        action: 'VIEWS',
        status: true,
      },
      {
        nombre: 'Editar',
        icon: 'assets/icons/pen.png',
        method: 'onUpdate',
        action: 'EDIT',
        status: true,
      },
      {
        nombre: 'Pendiente',
        icon: 'assets/icons/danger.png',
        method: 'onUpdateStatus',
        status: true,
        id: 1,
      },
      {
        nombre: 'En proceso',
        icon: 'assets/icons/process.png',
        method: 'onUpdateStatus',
        status: true,
        id: 2,
      },
      {
        nombre: 'Ejecutado',
        icon: 'assets/icons/check.png',
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
        icon: 'assets/icons/view.png',
        method: 'onUpdate',
        action: 'VIEWS',
        status: true,
      },
      {
        nombre: 'Editar',
        icon: 'assets/icons/pen.png',
        method: 'onUpdate',
        action: 'EDIT',
        status: true,
      },
    ],
  },
];

export const fieldsUpdate = [
  {
    fields: 'usuario_actualizado',
    value: 'YVALDEZ',
  },
  {
    fields: 'usuario_actualizado',
    value: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
];
