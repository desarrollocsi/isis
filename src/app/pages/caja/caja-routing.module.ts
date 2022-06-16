import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaPagoconsumoComponent } from './caja-pagoconsumo/caja-pagoconsumo.component';

const routes: Routes = [
  { path: 'pagoconsumo', component: CajaPagoconsumoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajaRoutingModule {}
