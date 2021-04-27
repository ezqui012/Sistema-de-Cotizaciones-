import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rol-dropdown',
  templateUrl: './rol-dropdown.component.html',
  styleUrls: ['./rol-dropdown.component.css']
})
export class RolDropdownComponent implements OnInit {
  roles: any = [];
  constructor() { }

  ngOnInit(): void {
  }
 /* getRoles(){
    this.rolService.getRoles().subscribe((Rol) => {
      console.log(Rol);
      return this.roles = Rol;
    });
  }*/

}
