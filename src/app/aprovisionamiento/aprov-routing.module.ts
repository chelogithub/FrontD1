import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovPage } from './aprov.page';

const routes: Routes = [
  {
    path: '',
    component: AprovPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovPageRoutingModule {}
