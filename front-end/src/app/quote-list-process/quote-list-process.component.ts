import { QuoteProcessService } from './../services/quote-process.service';
import { Quote } from './../Model/quoteModel';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PersonalUserService } from '../services/PersonalUser.service';
import { Faculty } from '../Model/faculty';
import { DetailRequestService } from '../services/detail-request.service';
import { ReportQuotes } from '../reports/reportQuotes';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { QuoteDetailService } from '../services/quote-detail.service';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-quote-list-process',
  templateUrl: './quote-list-process.component.html',
  styleUrls: ['./quote-list-process.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
})

export class QuoteListProcessComponent implements OnInit {

  quotes: Array<Quote> = [];
  quote: Quote[] | undefined;
  business: any;
  quoteUnitecost: any;
  quantity: any
  reason: any;
  total: any;
  id_rq: any;
  quoteId: any;
  pos = 0;
  chkAproveSol: boolean = false;
  report: ReportQuotes = new ReportQuotes;
  faculty: Faculty = new Faculty;
  nameFaculty:any
  userName:any;

  newList: any;

  spinnerType: string | any;
  spinnerName: string | any;

  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService: QuoteProcessService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public config: NgbPopoverConfig,
    private service: DetailRequestService,
    public serviceQuote: QuoteDetailService,
    private spinner: NgxSpinnerService
  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.business = this.route.snapshot.params.business;
    this.quoteId = this.route.snapshot.params.id;
    this.getFaculty();
    this.getQuoteProcess();
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
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  navigateToEdit(path: String) {
    this.router.navigate([path]);
  }

  getTotalQuote() {

  }

  async getQuoteProcess(){
    this.quoteProcessService.getQuoteProcess(this.quoteId).subscribe((res)=>{
      this.newList = res;
      this.quotes = res;
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

  deleteQuoteProcess(id:any){
    this.spinner.show(this.spinnerName);
    this.quoteProcessService.deleteProcess(id).subscribe(data=>{
      this.getQuoteProcess();
    },
    (error) => {
      this.spinner.hide(this.spinnerName);
    })
  }
  //methodo report
  generatePdf() {
    this.report.generateQuotePerformedPdf(this.business, this.userName, this.userName, this.nameFaculty, 'Proceso', this.quotes)
  }
}
