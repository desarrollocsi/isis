import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './caja.component';
import { CajaPagoconsumoComponent } from './caja-pagoconsumo/caja-pagoconsumo.component';

@NgModule({
  declarations: [
    CajaComponent,
    CajaPagoconsumoComponent,
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class CajaModule {}