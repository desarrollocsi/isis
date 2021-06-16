import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProgramaciondesalasRoutingModule } from './programaciondesalas-routing.module';
import { ProgramaciondesalasComponent } from './programaciondesalas.component';
import { ProgramaciondesalasListadoComponent } from './programaciondesalas-listado/programaciondesalas-listado.component';
import { ProgramaciondesalasRegistradoComponent } from './programaciondesalas-registrado/programaciondesalas-registrado.component';

@NgModule({
  declarations: [ProgramaciondesalasComponent, ProgramaciondesalasListadoComponent, ProgramaciondesalasRegistradoComponent],
  imports: [
    CommonModule,
    ProgramaciondesalasRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProgramaciondesalasModule {}
