import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NodosPage } from './nodos.page';

const routes: Routes = [
  {
    path: '',
    component: NodosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodosPageRoutingModule {}
