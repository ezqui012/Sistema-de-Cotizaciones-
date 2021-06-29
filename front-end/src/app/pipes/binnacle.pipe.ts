import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'binnacle'
})
export class BinnaclePipe implements PipeTransform {

  transform(value: any[], searchRequest: String): any[] {

      if(!searchRequest||!value){return value;}
      return value.filter(requestList =>
        requestList.business_name.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.status.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.name.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.date.indexOf(searchRequest)!==-1);
  }

}
