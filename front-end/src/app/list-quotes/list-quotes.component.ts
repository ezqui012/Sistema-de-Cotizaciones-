import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { QuoteList } from '../Model/quoteModel';
import { QuoteService } from '../services/quote.service';


@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  encapsulation:ViewEncapsulation.Emulated,
  styleUrls: ['./list-quotes.component.css']
})
export class ListQuotesComponent implements OnInit {
  quotes: Array<QuoteList> = [];
  status: String = ''
  statusQuote: any = {
    //process: 'Proceso',
    rejected: 'Rechazado',
    accepted: 'Aceptado',
    finalized: 'Finalizado',
    quoteProcess: 'En Espera'

  }
  constructor(
    private router: Router,
    public serviceQuote: QuoteService,
    private titlePage: Title,
    public config: NgbPopoverConfig
    ) {
      this.titlePage.setTitle('Lista de Cotizaciones - QUOT-UMSS');
      config.placement = 'left';
      config.triggers = 'hover';
     }

  ngOnInit(): void {
    this.getQoutesFinish();
  }
  navigateTo(path: String, id:any, idQ:any, entrusted:any){
    this.router.navigate([path,id,idQ,entrusted]);
  }
  getQoutesFinish(){
    this.serviceQuote.getQuoteFinish().subscribe((quote)=> {
      this.quotes = quote

    })
  }
  setStatusQuote(status: string): void {
    this.status = status
  }
  getStatusQuote(status:string): string{
   switch (status){
     case 'Aceptado':{
       return 'Aceptado';
     }
     case 'Rechazado':{
       return 'Rechazado';
     }
     case 'Finalizado':{
       return 'En espera';
     }
     default:{
       return '';
     }
   }
  }
}
