import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ListService } from '../services/list.service';
import { FormControl } from '@angular/forms';
import { ListUnit } from '../Model/list';

@Component({
  selector: 'app-administrativas',
  templateUrl: './administrativas.component.html',
  styleUrls: ['./administrativas.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdministrativasComponent implements OnInit {
  contenido: any;

  show: boolean = false;

  description_list: FormControl = new FormControl('')
  gastoUnit: Array<ListUnit> = []
  administrativoUnit: Array<ListUnit> = []
  pos = 0;


  constructor(private modal: NgbModal,
    private router: Router, private servicio: ListService,
    public config: NgbPopoverConfig,
    private titlePage: Title,

    public _listService: ListService) {
    this.titlePage.setTitle('Lista de Unidades - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';

  }


  ngOnInit(): void {
    this.getList();
    this.getListAdministrativa();

  }

  getList() {
    this._listService.gastoUnit().subscribe((list) => {
      console.log(list)
      return this.gastoUnit = list

    })
  }

  getListAdministrativa() {
    this._listService.adminUnit().subscribe((list) => {
      console.log(list)
      return this.administrativoUnit = list

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






}

