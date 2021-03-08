import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ModulesComponent } from './components/modules/modules.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [ModulesComponent, CalendarComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [CalendarComponent],
})
export class SharedModule {}
