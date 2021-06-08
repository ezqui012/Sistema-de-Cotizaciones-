import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any): any {

    const resultRequest = [];
      for(const request of value){
        if(request.business_name.toLowerCase().indexOf(args)  >-1){
          resultRequest.push(request);
      };
      if(request.status.toLowerCase().indexOf(args)  >-1){
        resultRequest.push(request);
      };
       if(request.status.indexOf(args)  >-1){
        resultRequest.push(request);
      };
      if(request.business_name.indexOf(args)  >-1){
      resultRequest.push(request);
     };
     if(request.date.indexOf(args)  >-1){
      resultRequest.push(request);
     };
    }


    return resultRequest;
  }
}
