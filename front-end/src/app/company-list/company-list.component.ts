import { CompanyService } from './../services/company.service';
import { Company } from './../Model/company';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyList } from '../Model/companyList';
import { CompanyListService } from '../services/company-list.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  id_ent:any;
  listCompany: Array<CompanyList>=[];
  pos:number = 0;
  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    private serviceCompany: CompanyListService,
    public config: NgbPopoverConfig,
    private route : ActivatedRoute

  ) {
    this.titlePage.setTitle('Lista de Empresas - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getListCompany();
    this.id_ent=this.route.snapshot.params.id;
  }
  navigateTo(path: String){

    this.router.navigate([path]);
  }
  navigateToEdit(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any, i:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = i;
  }
  getListCompany(){
    this.serviceCompany.allListCompany().subscribe((data) => {
      this.listCompany = data;
      },
      (error:any) => {
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

}
