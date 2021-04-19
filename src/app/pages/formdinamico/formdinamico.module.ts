import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormdinamicoRoutingModule } from './formdinamico-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';

import { FormdinamicoComponent } from './formdinamico.component';
import { FormdinamicoListComponent } from './formdinamico-list/formdinamico-list.component';
import { FormdinamicoModalComponent } from './formdinamico-modal/formdinamico-modal.component';

@NgModule({
  declarations: [
    FormdinamicoComponent,
    FormdinamicoListComponent,
    FormdinamicoModalComponent,
  ],
  imports: [
    CommonModule,
    FormdinamicoRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class FormdinamicoModule {}
