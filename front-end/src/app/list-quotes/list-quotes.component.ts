import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteList } from '../Model/quote';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  encapsulation:ViewEncapsulation.Emulated,
  styleUrls: ['./list-quotes.component.css']
})
export class ListQuotesComponent implements OnInit {
  quotes: Array<QuoteList> = [];
  constructor(
    private router: Router,
    public serviceQuote: QuoteService
    ) { }

  ngOnInit(): void {
    this.getQoutesFinish();
  }
  navigateTo(path: String, id:any, entrusted:any){
    this.router.navigate([path,id,entrusted]);
  }
  getQoutesFinish(){
    this.serviceQuote.getQuoteFinish().subscribe((quote)=> {
      this.quotes = quote

    })
  }
}
