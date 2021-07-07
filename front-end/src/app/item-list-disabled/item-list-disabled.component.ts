import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { RequestQuoteService } from '../services/request.service';
import { DateExpenseItem } from '../Model/expenseItem';

import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-item-list-disabled',
  templateUrl: './item-list-disabled.component.html',
  styleUrls: ['./item-list-disabled.component.css'],
  providers: [NgbPopoverConfig],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemListDisabledComponent implements OnInit {
  itemList: DateExpenseItem | any;
  pos: any;

  spinnerType: string | any;
  spinnerName: string | any;
  pageActual: number =1;
  numItem:number = 8;
  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    public config: NgbPopoverConfig,
    private service: RequestQuoteService,
    private spinner: NgxSpinnerService
  ) {
    this.titlePage.setTitle('Lista de deshabilitados - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.loadListItems();
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  openModal(content: any, pos: number){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }

  loadListItems(){
    this.service.allItem('F').subscribe(
      (data) => {
        this.itemList = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Regargue la pagina`);
        this.spinner.hide(this.spinnerName);
      }
    );
  }
  updateStatusData(id:number){
    this.service.updateStatusData(id,'V').subscribe(
      (data) => {
        //this.spinner.hide(this.spinnerName);
        this.loadListItems();
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Regargue la pagina`);
        this.spinner.hide(this.spinnerName);
      }
    );
  }
}