import { QuoteProcessService } from './../services/quote-process.service';
import { Quote } from './../Model/quoteModel';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUserService } from '../services/PersonalUser.service';
import { ToastrService } from 'ngx-toastr';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { QuoteDetailService } from '../services/quote-detail.service';


@Component({
  selector: 'app-quote-list-process',
  templateUrl: './quote-list-process.component.html',
  styleUrls: ['./quote-list-process.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
})

export class QuoteListProcessComponent implements OnInit {

  quotes: Array<Quote>=[];
  quote: Quote[] | undefined;
  business: any;
  quoteUnitecost: any;
  quantity:any
  reason: any;
  total: any;
  id_rq: any;
  quoteId: any;
  pos = 0;
  chkAproveSol:boolean = false;

  newList: any;

  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService:QuoteProcessService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public config: NgbPopoverConfig,
    public serviceQuote: QuoteDetailService
  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.business = this.route.snapshot.params.business;
    this.quoteId = this.route.snapshot.params.id;
    this.getQuoteProcess();
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  navigateToEdit(path: String){
    this.router.navigate([path]);
  }

  getTotalQuote(){

  }

  async getQuoteProcess(){
    this.quoteProcessService.getQuoteProcess(this.quoteId).subscribe((res)=>{
      this.newList = res;
      this.loadAttachment();
    })
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

  deleteQuoteProcess(id:any){
    this.quoteProcessService.deleteProcess(id).subscribe(data=>{
      this.getQuoteProcess();
    })
  }

}
