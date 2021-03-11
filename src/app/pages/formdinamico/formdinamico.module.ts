import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { FormdinamicoRoutingModule } from './formdinamico-routing.module';
import { FormdinamicoComponent } from './formdinamico.component';
import { FormdinamicoListComponent } from './formdinamico-list/formdinamico-list.component';

@NgModule({
  declarations: [FormdinamicoComponent, FormdinamicoListComponent],
  imports: [
    CommonModule,
    FormdinamicoRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
})
export class FormdinamicoModule {}
