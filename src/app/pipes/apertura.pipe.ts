import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apertura'
})
export class AperturaPipe implements PipeTransform {
  data: string;
  transform(value: number): string {

    if(value === 1)
    {
      this.data='ACTIVO';
    }
    else
    {
      this.data='INACTIVO';
    }


    return this.data;
  }

}
