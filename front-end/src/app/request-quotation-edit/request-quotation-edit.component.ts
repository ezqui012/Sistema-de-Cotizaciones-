import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateExpenseItem } from '../Model/expenseItem';
import { RequestQuoteService } from '../services/request.service';

@Component({
  selector: 'app-request-quotation-edit',
  templateUrl: './request-quotation-edit.component.html',
  encapsulation:ViewEncapsulation.Emulated,
  styleUrls: ['./request-quotation-edit.component.css']
})
export class RequestQuotationEditComponent implements OnInit {
  id:any
  items:Array<DateExpenseItem>=[]
  constructor(
    private route: ActivatedRoute,
    public serviceRequestQuote: RequestQuoteService,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllItem();
  }

  getAllItem(){
    this.serviceRequestQuote.allItem().subscribe((item)=>{
      this.items = item
    })
  }

}
