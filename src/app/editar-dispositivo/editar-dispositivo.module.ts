import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarDispositivoPageRoutingModule } from './editar-dispositivo-routing.module';

import { EditarDispositivoPage } from './editar-dispositivo.page';

import { DirectivaDirective } from '../directives/directiva.directive';
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EditarDispositivoPageRoutingModule
  ],
  declarations: [EditarDispositivoPage]
})
export class EditarDispositivoPageModule {}
