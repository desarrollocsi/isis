import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdmisionRoutingModule } from './admision-routing.module';
import { AdmisionLayaoutComponent } from './admision-layaout/admision-layaout.component';
import { AdmisionDatosdelpacientesComponent } from './admision-datosdelpacientes/admision-datosdelpacientes.component';
import { AdmisionDatosdelacitaComponent } from './admision-datosdelacita/admision-datosdelacita.component';
import { AdmisionAcreditacionComponent } from './admision-acreditacion/admision-acreditacion.component';
import { AdmisionCoberturasComponent } from './admision-coberturas/admision-coberturas.component';

@NgModule({
  declarations: [
    AdmisionLayaoutComponent,
    AdmisionDatosdelpacientesComponent,
    AdmisionDatosdelacitaComponent,
    AdmisionAcreditacionComponent,
    AdmisionCoberturasComponent,
  ],
  imports: [
    CommonModule,
    AdmisionRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdmisionModule {}
