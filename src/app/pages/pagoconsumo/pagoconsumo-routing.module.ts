import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoConsumoComponent } from './pagoconsumo.component';

const routes: Routes = [{ path: '', component: PagoConsumoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoConsumoRoutingModule {}
