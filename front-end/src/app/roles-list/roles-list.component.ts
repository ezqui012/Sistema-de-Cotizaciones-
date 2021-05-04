import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';
import { Permit } from '../Model/permit';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { AssignedPermit } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';


@Component({
  selector: 'app-roles-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  name_role: FormControl = new FormControl('')
  description_role: FormControl = new FormControl('')
  roles: Array<Roles> = [];
  permits: Array<Permit> = [];
  permitOfRol: Array<Permit> = [];

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
    //this.verPermit(3);
  }
  getRole() {
    this._roleService.allRoles().subscribe((role) => {
      return this.roles = role
    })
  }

  verPermit(idRole: any) {
    this._assignedPermitService.allAssignedPermit().subscribe((permitID) => {
      //this.permits = [];
      //console.log(permitID[1].id_role)
      for (let i = 0; i < permitID.length; i++) {
        if (permitID[i].id_role == idRole) {
          this.permits.push(permitID[i].id_permission);


        }
      }
      //this.permitOfRol = [];
      this._permitService.allPermit().subscribe((permit) => {
        for (let j = 0; j < this.permits.length; j++) {
          for (let r = 0; r < permit.length; r++) {
            if (this.permits[j] == permit[r].id_permission) {
              this.permitOfRol.push(permit[r].name_permission);

            }
          }
        }
        //console.log(this.permits);
        //console.log(this.permitOfRol);
        return this.permitOfRol;
      })
    })

  }
  // addRole():void{
  //   let name_role = this.name_role.value;
  //   let description_role = this.description_role.value;
  //   this._roleService.allRoles().subscribe(data => console.log(data))
  //   //this.getRole();
  //   alert("Se creo el rol: "+name_role+ " con Exito!");
  //   this.name_role.setValue("");
  //   this.description_role.setValue("");



  // }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  openModal(content: any, pos: any, idRole: any) {
    this.permitOfRol = [];
    this.permits = [];
    this.modal.open(content, { windowClass: "colorModal" });
    this.pos = pos;

    this.verPermit(idRole);
  }
  confir() {
    alert("Seguro que quiere crear el Rol?");
  }


}
