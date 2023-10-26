import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarDispositivoPage } from './editar-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarDispositivoPageRoutingModule {}
