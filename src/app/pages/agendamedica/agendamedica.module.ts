import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AgendamedicaRoutingModule } from './agendamedica-routing.module';
import { AgendamedicaComponent } from './agendamedica.component';
import { AgendamedicaListComponent } from './agendamedica-list/agendamedica-list.component';

@NgModule({
  declarations: [AgendamedicaComponent, AgendamedicaListComponent],
  imports: [
    CommonModule,
    AgendamedicaRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class AgendamedicaModule {}
