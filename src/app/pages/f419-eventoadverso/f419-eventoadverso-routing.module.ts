import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F419EventoadversoComponent } from './f419-eventoadverso.component';
import { F419EventoadversoListadoComponent } from './f419-eventoadverso-listado/f419-eventoadverso-listado.component';
import { F419EventoadversoRegistrarEditComponent } from './f419-eventoadverso-registrar-edit/f419-eventoadverso-registrar-edit.component';

const routes: Routes = [
  {
    path: '',
    component: F419EventoadversoComponent,
    children: [
      { path: '', component: F419EventoadversoListadoComponent },
      { path: 'registrar', component: F419EventoadversoRegistrarEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F419EventoadversoRoutingModule {}
