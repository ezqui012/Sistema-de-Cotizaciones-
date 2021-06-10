import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalUserService } from '../services/PersonalUser.service';
import { QuoteProcessService } from '../services/quote-process.service';
import { QuoteDetailService } from '../services/quote-detail.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quote-list-finalized',
  templateUrl: './quote-list-finalized.component.html',
  styleUrls: ['./quote-list-finalized.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
})
export class QuoteListFinalizedComponent implements OnInit {

  pos = 0;
  business:any;
  quoteId:any;
  quantity:any;
  quoteUnitecost: any;
  reason: any;
  total: any;
  status:any;
  chkAproveSol:boolean = false;

  newList: any;

  constructor(
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService:QuoteProcessService,
    private route: ActivatedRoute,
    public serviceQuote: QuoteDetailService,
    public config: NgbPopoverConfig,
  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.params.id;
    this.getFinalizedQuote();
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  async getFinalizedQuote(){
    this.quoteProcessService.getQuoteFinalized(this.quoteId).subscribe((res)=>{

    this.newList = res;

    this.loadAttachment();

    this.business = this.newList[0].business_name;
    this.quoteUnitecost = this.newList[0].unit_cost;
    this.quantity = this.newList[0].quantity;
    this.total = this.quantity * this.quoteUnitecost;
    this.newList[0].Total = this.total;
    this.status = this.newList[0].status_quotation;

    });
  }

  loadAttachment(){
    for(let _i=0; _i<this.newList.length; _i++){
      this.newList[_i].isImg = false;
      this.newList[_i].routeFile = 'empty';
      this.serviceQuote.getAttachment(this.newList[_i].id_qd).subscribe(
        (data: any) => {
          if(data !== null){
            this.newList[_i].isImg = true;
            this.newList[_i].routeFile = data.file_route;
          }
        }
      );
    }
  }

  openAttachment(uriAttachment: any){
    window.open(uriAttachment, '_blank');
  }

}
