import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AperturaPipe } from '../pipes/apertura.pipe';
import { IonicModule } from '@ionic/angular';
import { DispositivoPageRoutingModule } from './dispositivo-routing.module';
import { DispositivoPage } from './dispositivo.page';
import { HomePageModule } from '../home/home.module';
import { SharedModule } from '../pipes/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule,
    SharedModule,
  ],
  declarations: [DispositivoPage]
})
export class DispositivoPageModule {}
