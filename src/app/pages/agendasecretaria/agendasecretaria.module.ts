import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgendasecretariaRoutingModule } from './agendasecretaria-routing.module';
import { AgendasecretariaComponent } from './agendasecretaria.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AgendasecretariaComponent],
  imports: [
    CommonModule,
    AgendasecretariaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AgendasecretariaModule {}
