import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RolesGuard } from './core/guard/';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'modulos',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'home',
    canLoad: [AuthGuard, RolesGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
