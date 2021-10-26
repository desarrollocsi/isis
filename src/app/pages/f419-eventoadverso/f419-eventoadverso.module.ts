import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { F419EventoadversoRoutingModule } from './f419-eventoadverso-routing.module';
import { F419EventoadversoComponent } from './f419-eventoadverso.component';
import { F419EventoadversoListadoComponent } from './f419-eventoadverso-listado/f419-eventoadverso-listado.component';
import { F419EventoadversoRegistrarEditComponent } from './f419-eventoadverso-registrar-edit/f419-eventoadverso-registrar-edit.component';

@NgModule({
  declarations: [
    F419EventoadversoComponent,
    F419EventoadversoListadoComponent,
    F419EventoadversoRegistrarEditComponent,
  ],
  imports: [
    CommonModule,
    F419EventoadversoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class F419EventoadversoModule {}
