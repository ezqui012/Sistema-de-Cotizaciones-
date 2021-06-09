import { QuoteProcessService } from './../services/quote-process.service';
import { Quote } from './../Model/quoteModel';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { PersonalUserService } from '../services/PersonalUser.service';
import { Faculty } from '../Model/faculty';
import { DetailRequestService } from '../services/detail-request.service';
import { ReportQuotes } from '../reports/reportQuotes';


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

  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService: QuoteProcessService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public config: NgbPopoverConfig,
    private service: DetailRequestService

  ) {
    this.titlePage.setTitle('Detalle de cotización - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.business = this.route.snapshot.params.business;
    this.quoteId = this.route.snapshot.params.id;
    this.getQuoteProcess();
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
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  navigateToEdit(path: String) {
    this.router.navigate([path]);
  }

  getTotalQuote() {

  }

  getQuoteProcess() {
    this.quoteProcessService.getQuoteProcess(this.quoteId).subscribe((res) => {
      this.quotes = res;
      console.log(res)
    })
  }

  deleteQuoteProcess(id:any){
    this.quoteProcessService.deleteProcess(id).subscribe(data=>{
      this.getQuoteProcess();
    })
  }
  //methodo report
  generatePdf() {
    this.report.generateQuotePerformedPdf(this.business, this.userName, this.userName, this.nameFaculty, 'Proceso', this.quotes)
  }
}
