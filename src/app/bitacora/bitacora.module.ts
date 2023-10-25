import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BitacoraPageRoutingModule } from './bitacora-routing.module';
import { BitacoraPage } from './bitacora.page';
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BitacoraPageRoutingModule
  ],
  declarations: [BitacoraPage]
})
export class BitacoraPageModule {}
