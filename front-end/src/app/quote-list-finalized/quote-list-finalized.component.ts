import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from '../Model/faculty';
import { ReportQuotes } from '../reports/reportQuotes';
import { DetailRequestService } from '../services/detail-request.service';
import { PersonalUserService } from '../services/PersonalUser.service';
import { QuoteProcessService } from '../services/quote-process.service';
import { QuoteDetailService } from '../services/quote-detail.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '../Model/quoteModel';

import { NgxSpinnerService } from "ngx-spinner";

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
  report: ReportQuotes = new ReportQuotes;
  faculty: Faculty = new Faculty;
  nameFaculty:any
  userName:any;
  quotes: Array<Quote>=[];
  newList: any;

  spinnerType: string | any;
  spinnerName: string | any;

  constructor(
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService:QuoteProcessService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private service: DetailRequestService,
    public serviceQuote: QuoteDetailService,
    public config: NgbPopoverConfig,
    private spinner: NgxSpinnerService,
  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.quoteId = this.route.snapshot.params.id;
    this.getFinalizedQuote();
    this.getFaculty();
  }
  getFaculty(){
    this.service.getFaculty(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        this.faculty = data;
        this.nameFaculty = data.name_faculty;
        this.userName = localStorage.getItem('quot-user');
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  async getFinalizedQuote(){
    this.quoteProcessService.getQuoteFinalized(this.quoteId).subscribe((res)=>{
    this.quotes = res
    this.business = this.quotes[0].business_name
    this.quoteUnitecost = this.quotes[0].unit_cost
    this.quantity = this.quotes[0].quantity
    this.total = this.quantity * this.quoteUnitecost
    this.quotes[0].Total = this.total
    this.status = this.quotes[0].status_quotation

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
    this.spinner.hide(this.spinnerName);
  }

  openAttachment(uriAttachment: any){
    window.open(uriAttachment, '_blank');
  }
  generatePdf() {
    this.report.generateQuotePerformedPdf(this.business, this.userName, this.userName, this.nameFaculty, 'Finalizado', this.quotes)
  }
}
