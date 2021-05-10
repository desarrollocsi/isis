import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { HistoriaRoutingModule } from './historia-routing.module';
import { HistoriaComponent } from './historia.component';
import { HistoriaRegistrarComponent } from './historia-registrar/historia-registrar.component';
import { HistoriaSearchComponent } from './historia-search/historia-search.component';

@NgModule({
  declarations: [
    HistoriaComponent,
    HistoriaRegistrarComponent,
    HistoriaSearchComponent,
  ],
  imports: [
    CommonModule,
    HistoriaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class HistoriaModule {}
