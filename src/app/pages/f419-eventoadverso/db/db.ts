import * as moment from 'moment';
import { AuthStorageService } from '../../../core/services';

const user = new AuthStorageService();

export const perfilMenu = [
  {
    perfil: 'Scalidad',
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
    perfil: 'Ucalidad',
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
    value: user.User,
  },
  {
    fields: 'usuario_actualizado',
    value: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
];
