import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodosPageRoutingModule } from './nodos-routing.module';

import { NodosPage } from './nodos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NodosPageRoutingModule
  ],
  declarations: [NodosPage]
})
export class NodosPageModule {}
