import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { PagoConsumoRoutingModule } from './pagoconsumo-routing.module';
import { PagoConsumoComponent } from './pagoconsumo.component';
import { SharedModule } from '../../shared/shared.module';
import { PagoConsumoModalComponent } from './pagoconsumo-modal/pagoconsumo-modal.component';
import { PagoConsumoRegistrarComponent } from './pagoconsumo-registrar/pagoconsumo-registrar.component';

@NgModule({
  declarations: [
    PagoConsumoComponent,
    PagoConsumoModalComponent,
    PagoConsumoRegistrarComponent,
  ],
  imports: [
    CommonModule,
    PagoConsumoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class PagoConsumoModule {}
