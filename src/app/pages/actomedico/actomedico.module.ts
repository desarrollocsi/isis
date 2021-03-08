import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ActomedicoRoutingModule } from './actomedico-routing.module';
import { ActomedicoComponent } from './actomedico.component';

@NgModule({
  declarations: [ActomedicoComponent],
  imports: [
    CommonModule,
    ActomedicoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ActomedicoModule {}
