import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {
  data: string;
  transform(value: number): string {

    if(value === 1)
    {
      this.data='INSTALADO';
    }
    else
    {
      this.data='NO INSTALADO';
    }


    return this.data;
  }

}
