import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { ConsultasAtencionesRoutingModule } from './consultas-atenciones-routing.module';
import { ConsultasAtencionesComponent } from './consultas-atenciones.component';
import { ConsultasAtencionesSearchComponent } from './consultas-atenciones-search/consultas-atenciones-search.component';
import { ConsultasAtencionesListComponent } from './consultas-atenciones-list/consultas-atenciones-list.component';

@NgModule({
  declarations: [
    ConsultasAtencionesComponent,
    ConsultasAtencionesSearchComponent,
    ConsultasAtencionesListComponent,
  ],
  imports: [
    CommonModule,
    ConsultasAtencionesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class ConsultasAtencionesModule {}
