import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-admin',
  encapsulation: ViewEncapsulation.Emulated,

  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  nameUser = localStorage.getItem('quot-user') ? localStorage.getItem('quot-user') : '';

  constructor(
    private router: Router,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Inicio administrador - QUOT-UMSS');
   }

  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
}
