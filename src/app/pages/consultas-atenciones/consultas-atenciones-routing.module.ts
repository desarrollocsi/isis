import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasAtencionesComponent } from './consultas-atenciones.component';

const routes: Routes = [{ path: '', component: ConsultasAtencionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasAtencionesRoutingModule {}
