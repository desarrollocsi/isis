import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmisionLayaoutComponent } from './admision-layaout/admision-layaout.component';

const routes: Routes = [{ path: '', component: AdmisionLayaoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmisionRoutingModule {}
