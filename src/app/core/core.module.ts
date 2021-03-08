import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [NavbarComponent, LayoutComponent],
  imports: [CommonModule, CoreRoutingModule],
  exports: [NavbarComponent, LayoutComponent],
})
export class CoreModule {}
