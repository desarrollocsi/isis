import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActomedicoComponent } from './actomedico.component';

const routes: Routes = [{ path: '', component: ActomedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActomedicoRoutingModule {}
