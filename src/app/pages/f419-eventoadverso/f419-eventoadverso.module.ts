import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { F419EventoadversoRoutingModule } from './f419-eventoadverso-routing.module';
import { F419EventoadversoComponent } from './f419-eventoadverso.component';

@NgModule({
  declarations: [F419EventoadversoComponent],
  imports: [CommonModule, F419EventoadversoRoutingModule, ReactiveFormsModule],
})
export class F419EventoadversoModule {}
