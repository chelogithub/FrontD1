import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from '../fecha.pipe';
import { AperturaPipe } from '../apertura.pipe';
import { DirectivaDirective } from 'src/app/directives/directiva.directive';



@NgModule({
  declarations: [FechaPipe,AperturaPipe,DirectivaDirective],
  imports: [
    CommonModule
  ],
  exports:[FechaPipe,AperturaPipe,DirectivaDirective]
})
export class SharedModule { }
