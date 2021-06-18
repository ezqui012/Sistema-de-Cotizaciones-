import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { QuotationService } from '../services/quotation.service';
import { ListAssignedQuotes } from '../Model/quotation';

import { NgxSpinnerService } from "ngx-spinner";
import { EnterpriseService } from '../services/enterprise.service';
import { ItemRequest } from '../Model/expense-item';
import { DetailRequestService } from '../services/detail-request.service';
import { ReportRequest } from '../reports/reportRequest';
import { ReportQuotes } from '../reports/reportQuotes';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
  providers: [NgbPopoverConfig],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteListComponent implements OnInit {

  quotes: ListAssignedQuotes | any;

  spinnerType: string | any;
  spinnerName: string | any;
  items: ItemRequest[] | any;
  nameFaculty:string ='';
  report: ReportQuotes = new ReportQuotes;

  constructor(
    private services:QuotationService,
    private router:Router,
    private titlePage: Title,
    public config: NgbPopoverConfig,
    public toastr: ToastrService,
    private service: EnterpriseService,
    private serviceF:DetailRequestService,
    private spinner: NgxSpinnerService
  ) {
    this.titlePage.setTitle('Lista de cotizaciones asignadas - QUOT-UMSS')
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getList(localStorage.getItem('quot-umss-usr'));
    this.getFaculty();
  }

  getList(id: any){
    this.services.getListQuotes(id).subscribe(
      (data) => {
        this.quotes = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error('Ocurrio un error al cargar la pagina, intente nuevamente');
      }
    );
  }
  getFaculty(){
    this.serviceF.getFaculty(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        //this.faculty = data;
        this.nameFaculty = data.name_faculty;

      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }
  getReportQuoteEmpty(id:any){
    this.service.getItems(id).subscribe(
      (data) => {
        this.items = data;
        this.report.generateQuoteEmptyPdf(this.nameFaculty, this.items);
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }
  detailRequest(status: string, business: string, id: number){
    if(status==='Proceso'){
      this.navigateTo(`/quote-list-process/${business}/${id}`)
    }else{
      this.navigateTo(`/quote-list-finalized/${business}/${id}`)
    }
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  checkStatus(check: any){
    let res: boolean;
    (check === 'Proceso') ? res = true : res = false;
    return res;
  }

}
