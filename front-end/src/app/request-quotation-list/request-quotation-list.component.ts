import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RequestList } from '../Model/request';
import { RequestQuoteService } from '../services/request.service';

@Component({
  selector: 'app-request-quotation-list',
  templateUrl: './request-quotation-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./request-quotation-list.component.css']
})
export class RequestQuotationListComponent implements OnInit {
  request_quotation:Array<RequestList>=[]
  status:String=''
  constructor(
    public serviceRequestQuote:RequestQuoteService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getListRequestQuote();
  }

  getListRequestQuote(){
    this.serviceRequestQuote.allRequestQuote().subscribe((date) => {
      return this.request_quotation = date
    })
  }

  navigateTo(path: String ,id:any){
    this.router.navigate([path,id]);
  }

  setStatus(status:string):void{
   this.status = status
  }
}
