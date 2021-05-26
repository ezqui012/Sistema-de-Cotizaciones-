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

  constructor(
    private router: Router,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Inicio Usuario - QUOT-UMSS');
  }

  ngOnInit(): void {
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

}
