import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ModulesComponent } from './components/modules/modules.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { SearchPipe } from './pipe/search.pipe';
import { ProgrammingStatusPipe } from './pipe/programming-status.pipe';
import { PersonalPipe } from './pipe/personal.pipe';

@NgModule({
  declarations: [
    ModulesComponent,
    CalendarComponent,
    ToasterComponent,
    ProgrammingStatusPipe,
    SearchPipe,
    PersonalPipe,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    CalendarComponent,
    ToasterComponent,
    SearchPipe,
    ProgrammingStatusPipe,
    PersonalPipe,
  ],
})
export class SharedModule {}
