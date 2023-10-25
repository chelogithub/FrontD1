import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogsRiegoPageRoutingModule } from './logs-riego-routing.module';
import { LogsRiegoPage } from './logs-riego.page';
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,                 //Modulo que contiene todos los pipes
    LogsRiegoPageRoutingModule
  ],
  declarations: [LogsRiegoPage]
})
export class LogsRiegoPageModule {}
