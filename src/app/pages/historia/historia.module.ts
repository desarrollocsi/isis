import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HistoriaRoutingModule } from './historia-routing.module';
import { HistoriaComponent } from './historia.component';
import { HistoriaRegistrarComponent } from './historia-registrar/historia-registrar.component';

@NgModule({
  declarations: [HistoriaComponent, HistoriaRegistrarComponent],
  imports: [CommonModule, HistoriaRoutingModule, ReactiveFormsModule],
})
export class HistoriaModule {}
