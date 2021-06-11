import { Pipe, PipeTransform } from '@angular/core';
import { RequestList } from '../Model/request';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: RequestList[], searchRequest: String): RequestList[] {

    const resultRequest = [];
    const res =[];
      if(!searchRequest||!value){return value;}
      return value.filter(requestList =>
        requestList.business_name.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.status.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.name.toLowerCase().indexOf(searchRequest.toLocaleLowerCase())!==-1 ||
        requestList.date.indexOf(searchRequest)!==-1);

      // for(const request of value){

      //   if(request.business_name.toLowerCase().indexOf(args.toLowerCase())  >-1){
      //     resultRequest.push(request);
      // };

    //   if(request.status.toLowerCase().indexOf(args)  >-1){
    //     resultRequest.push(request);
    //   };
    //    if(request.status.indexOf(args)  >-1){
    //     resultRequest.push(request);
    //   };
    //   if(request.business_name.indexOf(args)  >-1){
    //   resultRequest.push(request);
    //  };
    //  if(request.date.indexOf(args)  >-1){
    //   resultRequest.push(request);
    //  };




  }
}
