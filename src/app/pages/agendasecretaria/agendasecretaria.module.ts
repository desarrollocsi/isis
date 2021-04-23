import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AgendasecretariaRoutingModule } from './agendasecretaria-routing.module';
import { AgendasecretariaComponent } from './agendasecretaria.component';
import { SharedModule } from '../../shared/shared.module';
import { AgendasecretariaListComponent } from './agendasecretaria-list/agendasecretaria-list.component';
import { AgendasecretariaFiltroComponent } from './agendasecretaria-filtro/agendasecretaria-filtro.component';
import { AgendasecretariaModalComponent } from './agendasecretaria-modal/agendasecretaria-modal.component';
import { AgendasecretariaRegistrarComponent } from './agendasecretaria-registrar/agendasecretaria-registrar.component';

@NgModule({
  declarations: [
    AgendasecretariaComponent,
    AgendasecretariaListComponent,
    AgendasecretariaFiltroComponent,
    AgendasecretariaModalComponent,
    AgendasecretariaRegistrarComponent,
  ],
  imports: [
    CommonModule,
    AgendasecretariaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class AgendasecretariaModule {}
