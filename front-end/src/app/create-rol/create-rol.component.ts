import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';



@Component({
  selector: 'app-create-rol',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  roles: Array<Roles>=[]
  name_role:FormControl = new FormControl('')
  description_role:FormControl = new FormControl('')

  constructor(private router: Router,
    public _roleService: RolesService
  ) { }

  ngOnInit(): void {
  }
  //navigate
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getRole() {
    this._roleService.getRole().subscribe((role) => {
      return this.roles = role
    })
  }
  addRole(): void {
    let name_role = this.name_role.value;
    let description_role = this.description_role.value;
    this._roleService.addRole(name_role, description_role).subscribe(data => console.log(data))
    //this.getRole();
    this.name_role.setValue("");
    this.description_role.setValue("");


  }

  //Angular material
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
