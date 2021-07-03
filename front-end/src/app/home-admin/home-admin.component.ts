import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-home-admin',
  encapsulation: ViewEncapsulation.Emulated,

  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  nameUser = localStorage.getItem('quot-user') ? localStorage.getItem('quot-user') : '';
  rolId = Number(localStorage.getItem('quot-umss-p') ? localStorage.getItem('quot-umss-p'): 1);
  rolUser: any;

  constructor(
    private router: Router,
    private titlePage: Title,
    private service: RolesService
  ) {
    this.titlePage.setTitle('Inicio administrador - QUOT-UMSS');
   }

  ngOnInit(): void {
    this.service.getRoleSelect(this.rolId).subscribe(
      (data) => {
        this.rolUser = data.name_role;
      }
    );
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
}
