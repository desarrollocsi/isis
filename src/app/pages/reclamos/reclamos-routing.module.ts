import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamosRegistrarComponent } from './reclamos-registrar/reclamos-registrar.component';
import { ReclamosTramaComponent } from './reclamos-trama/reclamos-trama.component';
import { ReclamosListComponent } from './reclamos-list/reclamos-list.component';

const routes: Routes = [
  { path: 'lista', component: ReclamosListComponent },
  { path: 'registrar', component: ReclamosRegistrarComponent },
  { path: 'tramas', component: ReclamosTramaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReclamosRoutingModule {}
