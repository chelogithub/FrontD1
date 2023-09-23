import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovPageRoutingModule } from './aprov-routing.module';

import { AprovPage } from './aprov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovPageRoutingModule
  ],
  declarations: [AprovPage]
})
export class AprovPageModule {}
