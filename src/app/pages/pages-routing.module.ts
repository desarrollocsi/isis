import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'programacion',
        loadChildren: () =>
          import('./programacion/programacion.module').then(
            (m) => m.ProgramacionModule
          ),
      },
      {
        path: 'actomedico',
        loadChildren: () =>
          import('./actomedico/actomedico.module').then(
            (m) => m.ActomedicoModule
          ),
      },
      {
        path: 'agendamedica',
        loadChildren: () =>
          import('./agendamedica/agendamedica.module').then(
            (m) => m.AgendamedicaModule
          ),
      },
      {
        path: 'agendasecretaria',
        loadChildren: () =>
          import('./agendasecretaria/agendasecretaria.module').then(
            (m) => m.AgendasecretariaModule
          ),
      },
      {
        path: 'ficheros',
        loadChildren: () =>
          import('./formdinamico/formdinamico.module').then(
            (m) => m.FormdinamicoModule
          ),
      },
      {
        path: 'calidad',
        loadChildren: () =>
          import('./f419-eventoadverso/f419-eventoadverso.module').then(
            (m) => m.F419EventoadversoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
