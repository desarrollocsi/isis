import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaciondesalasComponent } from './programaciondesalas.component';
import { ProgramaciondesalasListadoComponent } from './programaciondesalas-listado/programaciondesalas-listado.component';
import { ProgramaciondesalasRegistradoComponent } from './programaciondesalas-registrado/programaciondesalas-registrado.component';

const routes: Routes = [
  { path: '', component: ProgramaciondesalasComponent },
  { path: 'registrar', component: ProgramaciondesalasRegistradoComponent },
  { path: 'listado', component: ProgramaciondesalasListadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramaciondesalasRoutingModule {}
