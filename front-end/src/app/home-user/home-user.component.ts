import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeUserComponent implements OnInit {

  nameUser = localStorage.getItem('quot-user') ? localStorage.getItem('quot-user') : '';

  showQuote: boolean = false;
  showRequest: boolean = false;
  showAccept: boolean = false;
  showEnterprise: boolean = false;

  permission: number[] | any;

  constructor(
    private router: Router,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Inicio Usuario - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.permission = JSON.parse("[" + localStorage.getItem('quot-umss-pa') + "]");
    this.hasAccess();
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  hasAccess(){
    if(this.permission.includes(1) &&  this.permission.includes(2)){
      this.showQuote = true;
    }
    if(this.permission.includes(6)){
      this.showRequest = true;
    }
    if(this.permission.includes(3)){
      this.showAccept = true;
    }
    if(this.permission.includes(8)){
      this.showEnterprise = true;
    }
  }

}
