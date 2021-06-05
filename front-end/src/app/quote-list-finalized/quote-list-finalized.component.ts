import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUserService } from '../services/PersonalUser.service';
import { QuoteProcessService } from '../services/quote-process.service';
import { Quote } from './../Model/quoteModel';
@Component({
  selector: 'app-quote-list-finalized',
  templateUrl: './quote-list-finalized.component.html',
  styleUrls: ['./quote-list-finalized.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuoteListFinalizedComponent implements OnInit {
  quotes: Array<Quote>=[];

  pos = 0;
  business:any;
  quoteId:any;
  quantity:any;
  quoteUnitecost: any;
  reason: any;
  total: any;
  status:any;
  chkAproveSol:boolean = false;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService:QuoteProcessService,
    private route: ActivatedRoute
  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.params.id;
    this.getFinalizedQuote();
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any, pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }

  getFinalizedQuote(){
    this.quoteProcessService.getQuoteFinalized(this.quoteId).subscribe((res)=>{
    this.quotes = res

    this.business = this.quotes[0].business_name
    this.quoteUnitecost = this.quotes[0].unit_cost
    this.quantity = this.quotes[0].quantity
    this.total = this.quantity * this.quoteUnitecost
    this.quotes[0].Total = this.total
    this.status = this.quotes[0].status_quotation

    })
  }

}
