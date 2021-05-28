import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RequestList } from '../Model/request';
import { RequestQuoteService } from '../services/request.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-request-quotation-list',
  templateUrl: './request-quotation-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig], // add NgbPopoverConfig to the component providers
  styleUrls: ['./request-quotation-list.component.css']
})
export class RequestQuotationListComponent implements OnInit {
  request_quotation:Array<RequestList>=[]
  status:String=''
  statusRequest:any={
    process:'Proceso',
    rejected:'Rechazado',
    accepted:'Aceptado',
    quote:'Cotización'

  }
  constructor(
    public serviceRequestQuote:RequestQuoteService,
    private router: Router,
    public config: NgbPopoverConfig
  ) {
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getListRequestQuote();
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getListRequestQuote(){
    this.serviceRequestQuote.allRequestQuote().subscribe((date) => {
      return this.request_quotation = date
    })
  }

  navigateToPage(path: String ,id:any){
    this.router.navigate([path,id]);
  }

  setStatus(status:string):void{
   this.status = status
  }
}
