import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { QuotationService } from '../services/quotation.service';
import { ListAssignedQuotes } from '../Model/quotation';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
  providers: [NgbPopoverConfig],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteListComponent implements OnInit {

  quotes: ListAssignedQuotes | any;

  constructor(
    private services:QuotationService,
    private router:Router,
    private titlePage: Title,
    public config: NgbPopoverConfig,
    public toastr: ToastrService
  ) {
    this.titlePage.setTitle('Lista de cotizaciones asignadas - QUOT-UMSS')
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getList(localStorage.getItem('quot-umss-usr'));
  }

  getList(id: any){
    this.services.getListQuotes(id).subscribe(
      (data) => {
        this.quotes = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un error al cargar la pagina, intente nuevamente');
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
