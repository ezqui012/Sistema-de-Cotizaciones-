import { Component, OnInit } from '@angular/core';
import { RolDropdownService } from '../services/rol-dropdown.service';

@Component({
  selector: 'app-rol-dropdown',
  templateUrl: './rol-dropdown.component.html',
  styleUrls: ['./rol-dropdown.component.css']
})
export class RolDropdownComponent implements OnInit {

  roles: any = [];
  constructor(public rolService: RolDropdownService) { }

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles(){
    this.rolService.getRoles().subscribe((rol) => {
      console.log(rol);
      return this.roles = rol;
    });

  }

}
