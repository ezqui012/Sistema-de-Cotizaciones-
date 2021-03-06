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


  pos = 0;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _roleService: RolesService,
    public _assignedPermitService: AssignedPermitService,
    public _permitService: PermitService,
    public config: NgbPopoverConfig,
    private spinner: NgxSpinnerService,
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
    this._roleService.allRoles().subscribe((role) => {
      this.roles = role
      this.spinner.hide(this.spinnerName);
    })
  }
  getPermits(idRole:any) {
    this._assignedPermitService.allPermitOfRole(idRole).subscribe((permit) => {
      return this.permits = permit
    })
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



}
