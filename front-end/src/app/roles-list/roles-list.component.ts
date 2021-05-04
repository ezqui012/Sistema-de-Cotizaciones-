import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';
import { Permit } from '../Model/permit';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { PermitOfRole } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';


@Component({
  selector: 'app-roles-list',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

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
    public _permitService: PermitService
  ) { }

  ngOnInit(): void {
    this.getRole();

  }
  getRole() {
    this._roleService.allRoles().subscribe((role) => {
      return this.roles = role
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
  openModal(content: any, pos: any, idRole: any) {

    this.permits = [];
    this.modal.open(content, { windowClass: "colorModal" });
    this.pos = pos;
    this.getPermits(idRole);

  }



}
