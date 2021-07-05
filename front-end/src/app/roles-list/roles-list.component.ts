import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';
import { Permit } from '../Model/permit';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { PermitOfRole } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles-list',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  spinnerType: string | any;
  spinnerName: string | any;
  name_role: FormControl = new FormControl('')
  description_role: FormControl = new FormControl('')
  roles: Array<Roles> = [];
  permits: Array<PermitOfRole> = [];
  pageActual: number =1;
  numItem:number = 8;

  pos = 0;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _roleService: RolesService,
    public _assignedPermitService: AssignedPermitService,
    public _permitService: PermitService,
    public config: NgbPopoverConfig,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Lista de roles - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getRole();

  }
  getRole() {
    this._roleService.allRoles('V').subscribe((role) => {
      this.roles = role
      this.spinner.hide(this.spinnerName);
    },
    (error) => {
      this.toastr.error(`ERROR: ${error} Regargue la pagina`);
      this.spinner.hide(this.spinnerName);
    }


    );
  }
  getPermits(idRole:any) {
    this._assignedPermitService.allPermitOfRole(idRole).subscribe((permit) => {
      return this.permits = permit
    })
  }

  absoluteIndex(indexOnPage: number): number {
    return this.numItem * (this.pageActual - 1) + indexOnPage;
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  navigateToEdit(path: String ,id:any){
    this.router.navigate([path,id]);
  }
  openModal(content: any, pos: any, idRole: any) {
    this.permits = [];
    this.modal.open(content, { windowClass: "colorModal" });
    this.pos = pos;
    this.getPermits(idRole);
  }
  disabledRol(id:number){

      this._roleService.updateStatusData(id,'F').subscribe(
        (data) => {
          //this.spinner.hide(this.spinnerName);
          this.getRole();
        },
        (error) => {
          this.toastr.error(`ERROR: ${error} Regargue la pagina`);
          this.spinner.hide(this.spinnerName);
        }
      );

  }


}
