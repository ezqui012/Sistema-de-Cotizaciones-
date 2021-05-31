import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [NgbPopoverConfig],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemListComponent implements OnInit {

  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    public config: NgbPopoverConfig
  ) {
    this.titlePage.setTitle('Lista de Items - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  openModal(content: any){
    this.modal.open(content,{ windowClass:"colorModal"});
    //this.pos = pos;
  }

}
