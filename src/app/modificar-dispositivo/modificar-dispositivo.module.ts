import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarDispositivoPageRoutingModule } from './modificar-dispositivo-routing.module';

import { ModificarDispositivoPage } from './modificar-dispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarDispositivoPageRoutingModule
  ],
  declarations: [ModificarDispositivoPage]
})
export class ModificarDispositivoPageModule {}
