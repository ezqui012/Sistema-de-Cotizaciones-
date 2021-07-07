
import { Pipe, PipeTransform } from '@angular/core';
import { Binnacle } from '../Model/binnacle';
@Pipe({
  name: 'binnacle'
})
export class BinnaclePipe implements PipeTransform {

  transform(value: Binnacle[], searchBinacle: String): Binnacle[] {

      if(!searchBinacle||!value){return value;}
      return value.filter(requestBinacle =>
        requestBinacle.table_name.toLowerCase().indexOf(searchBinacle.toLocaleLowerCase())!==-1 ||
        requestBinacle.action.toLowerCase().indexOf(searchBinacle.toLocaleLowerCase())!==-1 ||
        requestBinacle.date.toLowerCase().indexOf(searchBinacle.toLocaleLowerCase())!==-1 );
  }

}
