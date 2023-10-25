import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from '../fecha.pipe';
import { AperturaPipe } from '../apertura.pipe';



@NgModule({
  declarations: [FechaPipe,AperturaPipe],
  imports: [
    CommonModule
  ],
  exports:[FechaPipe,AperturaPipe]
})
export class SharedModule { }
