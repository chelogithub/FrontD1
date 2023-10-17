import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitacoraPageRoutingModule } from './bitacora-routing.module';

import { BitacoraPage } from './bitacora.page';
import { FechaPipe } from '../pipes/fecha.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraPageRoutingModule
  ],
  declarations: [BitacoraPage, FechaPipe]
})
export class BitacoraPageModule {}
