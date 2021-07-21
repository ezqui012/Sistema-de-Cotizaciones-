import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { RequestList } from '../Model/request';
import { RequestQuoteService } from '../services/request.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-request-quotation-list',
  templateUrl: './request-quotation-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  styleUrls: ['./request-quotation-list.component.css']
})
export class RequestQuotationListComponent implements OnInit {
  spinnerType: string | any;
  spinnerName: string | any;
  request_quotation: Array<RequestList> = []
  status: String = ''
  idF = localStorage.getItem('quot-umss-f');
  idU = localStorage.getItem('quot-umss-u');
  statusRequest: any = {
    process: 'Proceso',
    rejected: 'Rechazado',
    accepted: 'Aceptado',
    quote: 'Cotización'

  }
  searchRequest!: any;
  constructor(
    public serviceRequestQuote: RequestQuoteService,
    private router: Router,
    private titlePage: Title,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public config: NgbPopoverConfig
  ) {

    this.titlePage.setTitle('Lista de solicitud - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getListRequestQuote();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getListRequestQuote() {
    this.serviceRequestQuote.allRequestQuote(this.idF, this.idU).subscribe((date) => {
      this.request_quotation = date
      this.spinner.hide(this.spinnerName);
    })
  }

  navigateToPage(path: String, id: any) {
    this.router.navigate([path, id]);
  }

  navigateToPageDetail(id: any, status: any) {
    if (status === 'Proceso') {
      this.router.navigate(['/request-detail/' + id]);
    } else if (status === 'Rechazado') {
      this.router.navigate(['/info-request-rejected/' + id]);
    } else if (status === 'Cotización') {
      this.router.navigate(['/info-request-quote/' + id]);
    } else if (status === 'Aceptado') {
      this.router.navigate(['/info-request-approved/' + id]);
    }
  }

  setStatus(status: string): void {
    this.status = status
  }

  verifyUser(id:any, name:any){
   if(name !== localStorage.getItem('quot-user')){
      this.toastr.info('No cuentas con permisos para editar esta solocitud');
      return;
   }
     this.navigateToPage('request-quotation-edit',id);

  }
}
