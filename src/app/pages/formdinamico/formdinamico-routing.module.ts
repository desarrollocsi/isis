import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormdinamicoComponent } from './formdinamico.component';

const routes: Routes = [
  { path: 'especialidades', component: FormdinamicoComponent },
  { path: 'medicos', component: FormdinamicoComponent },
  { path: 'turnos', component: FormdinamicoComponent },
  { path: 'consultorios', component: FormdinamicoComponent },
  { path: 'centrocosto', component: FormdinamicoComponent },
  { path: 'mediopago', component: FormdinamicoComponent },
  { path: 'tipocomprobante', component: FormdinamicoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormdinamicoRoutingModule {}
