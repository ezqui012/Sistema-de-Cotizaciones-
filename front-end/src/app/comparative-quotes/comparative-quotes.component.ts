import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseItems } from '../Model/expenseItem';
import { QuoteService } from '../services/quote.service';


@Component({
  selector: 'app-comparative-quotes',
  templateUrl: './comparative-quotes.component.html',
  encapsulation:ViewEncapsulation.Emulated,
  styleUrls: ['./comparative-quotes.component.css']
})
export class ComparativeQuotesComponent implements OnInit {
  id:any
  entrusted:any
  items:Array<ExpenseItems>=[]
  constructor(
    private route: ActivatedRoute,
    public serviceQuote: QuoteService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.entrusted = this.route.snapshot.paramMap.get('entrusted');
    this.getItems(this.id);
  }

  getItems(idRequest:any){
    this.serviceQuote.getItemsRequest(idRequest).subscribe((item)=> {
      this.items = item

    })
  }

}
