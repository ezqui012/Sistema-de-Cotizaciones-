import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { RequestList } from '../Model/request';
import { RequestQuoteService } from '../services/request.service';



@Component({
  selector: 'app-request-quotation-list',
  templateUrl: './request-quotation-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  styleUrls: ['./request-quotation-list.component.css']
})
export class RequestQuotationListComponent implements OnInit {
  request_quotation: Array<RequestList> = []
  status: String = ''
  statusRequest: any = {
    process: 'Proceso',
    rejected: 'Rechazado',
    accepted: 'Aceptado',
    quote: 'Cotización'

  }
  filterRequest= '';
  constructor(
    public serviceRequestQuote: RequestQuoteService,
    private router: Router,
    private titlePage: Title,
    public config: NgbPopoverConfig
  ) {

    this.titlePage.setTitle('Lista de solicitud - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getListRequestQuote();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getListRequestQuote() {
    this.serviceRequestQuote.allRequestQuote().subscribe((date) => {
      return this.request_quotation = date
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
}
