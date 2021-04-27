import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  encapsulation: ViewEncapsulation.None,

  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  nameUser = localStorage.getItem('quot-user') ? localStorage.getItem('quot-user') : '';

  constructor() { }

  ngOnInit(): void {
  }

}
