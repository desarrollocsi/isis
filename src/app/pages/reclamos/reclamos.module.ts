import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReclamosRoutingModule } from './reclamos-routing.module';
import { ReclamosComponent } from './reclamos.component';
import { ReclamosRegistrarComponent } from './reclamos-registrar/reclamos-registrar.component';
import { ReclamosListComponent } from './reclamos-list/reclamos-list.component';
import { ReclamosTramaComponent } from './reclamos-trama/reclamos-trama.component';
@NgModule({
  declarations: [
    ReclamosComponent,
    ReclamosRegistrarComponent,
    ReclamosListComponent,
    ReclamosTramaComponent,
  ],
  imports: [
    CommonModule,
    ReclamosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class ReclamosModule {}
