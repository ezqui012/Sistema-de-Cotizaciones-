import { CompanyService } from './../services/company.service';
import { Company } from './../Model/company';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Array<Company>=[];
  pos =0;
  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    public config: NgbPopoverConfig,
    private companyDataService: CompanyService

  ) {
    this.titlePage.setTitle('Lista de Empresas - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getEnterpriseList();
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  getEnterpriseList(){
     this.companyDataService.getEnterpriseList().subscribe(res=>{
      return this.companies=res
    })
  }
  openModal(content: any, pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }

}
