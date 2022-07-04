import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { ActomedicoRoutingModule } from './actomedico-routing.module';
import { ActomedicoComponent } from './actomedico.component';
import {
  MedicamentoComponent,
  ProcedimientoComponent,
  SearchComponent,
} from './searchs.component';

@NgModule({
  declarations: [
    ActomedicoComponent,
    MedicamentoComponent,
    ProcedimientoComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ActomedicoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class ActomedicoModule {}
