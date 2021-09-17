import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgramaciondesalasRoutingModule } from './programaciondesalas-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ProgramaciondesalasComponent } from './programaciondesalas.component';
import { ProgramaciondesalasListadoComponent } from './programaciondesalas-listado/programaciondesalas-listado.component';
import { ProgramaciondesalasRegistradoComponent } from './programaciondesalas-registrado/programaciondesalas-registrado.component';
import { ProgramaciondesalasModalComponent } from './programaciondesalas-modal/programaciondesalas-modal.component';
import { ProgramaciondesalasModalSalasComponent } from './programaciondesalas-modal-salas/programaciondesalas-modal-salas.component';
import { HistoriaSearchComponent } from './historia-search/historia-search.component';

@NgModule({
  declarations: [
    ProgramaciondesalasComponent,
    ProgramaciondesalasListadoComponent,
    ProgramaciondesalasRegistradoComponent,
    ProgramaciondesalasModalComponent,
    ProgramaciondesalasModalSalasComponent,
    HistoriaSearchComponent,
  ],
  imports: [
    CommonModule,
    ProgramaciondesalasRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class ProgramaciondesalasModule {}
