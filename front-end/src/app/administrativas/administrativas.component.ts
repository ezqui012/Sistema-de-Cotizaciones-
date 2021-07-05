import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { ListService } from '../services/list.service';
import { FormControl } from '@angular/forms';
import { ListUnit } from '../Model/list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrativas',
  templateUrl: './administrativas.component.html',
  styleUrls: ['./administrativas.component.css'],
  providers: [NgbPopoverConfig],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdministrativasComponent implements OnInit {
  spinnerType: string | any;
  spinnerName: string | any;
  contenido: any;

  show: boolean = false;

  description_list: FormControl = new FormControl('')
  gastoUnit: Array<ListUnit> = []
  administrativoUnit: Array<ListUnit> = []
  pos = 0;
  pageActual: number =1;
  numItem:number = 8;

  constructor(
    private modal: NgbModal,
    private router: Router, private servicio: ListService,
    public config: NgbPopoverConfig,
    private titlePage: Title,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public _listService: ListService
    ) {
    this.titlePage.setTitle('Lista de Unidades - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }


  ngOnInit(): void {
    this.getList();
    this.spinner.show(this.spinnerName);
    this.getListAdministrativa();

  }

  getList() {
    this._listService.gastoUnit('V').subscribe((list) => {

      this.gastoUnit = list
      this.spinner.hide(this.spinnerName);

    })
  }

  getListAdministrativa() {
    this._listService.adminUnit('V').subscribe((list) => {

      this.administrativoUnit = list
      this.spinner.hide(this.spinnerName);

    })
  }

  navigateToEdit(path: String, id: any) {
    this.router.navigate([path, id]);
  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  openModal(content: any, pos: any) {
    this.modal.open(content, { windowClass: "colorModal" });
    this.pos = pos;
  }


  showtable(show: boolean) {
    this.show = show;

  }

  updateStatusData(id:number){
    this._listService.updateStatusData(id,'F').subscribe(
      (data) => {
        //this.spinner.hide(this.spinnerName);
        this.getList();
        this.getListAdministrativa();
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Regargue la pagina`);
        this.spinner.hide(this.spinnerName);
      }
    );
  }




}

