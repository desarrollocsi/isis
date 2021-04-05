import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { FormdinamicoRoutingModule } from './formdinamico-routing.module';
import { FormdinamicoComponent } from './formdinamico.component';
import { FormdinamicoListComponent } from './formdinamico-list/formdinamico-list.component';
import { FormdinamicoAddEditComponent } from './formdinamico-add-edit/formdinamico-add-edit.component';
import { FormdinamicoModalComponent } from './formdinamico-modal/formdinamico-modal.component';

@NgModule({
  declarations: [
    FormdinamicoComponent,
    FormdinamicoListComponent,
    FormdinamicoAddEditComponent,
    FormdinamicoModalComponent,
  ],
  imports: [
    CommonModule,
    FormdinamicoRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class FormdinamicoModule {}
