import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { F419EventoadversoComponent } from './f419-eventoadverso.component';

const routes: Routes = [
  { path: 'eventosadversos', component: F419EventoadversoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class F419EventoadversoRoutingModule {}
