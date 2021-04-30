import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-roles-list',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  name_role:FormControl = new FormControl('')
  description_role:FormControl = new FormControl('')
  roles: Array<Roles>=[]
  pos = 0;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _roleService: RolesService
    ) { }

  ngOnInit(): void {
    this.getRole();
  }
  getRole(){
    this._roleService.getRole().subscribe((role)=> {
      return this.roles = role
    })
  }
  addRole():void{
    let name_role = this.name_role.value;
    let description_role = this.description_role.value;
    this._roleService.addRole(name_role, description_role).subscribe(data => console.log(data))
    //this.getRole();
    alert("Se creo el rol: "+name_role+ " con Exito!");
    this.name_role.setValue("");
    this.description_role.setValue("");



  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any ,pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }
  confir(){
    alert("Seguro que quiere crear el Rol?");
  }


}
