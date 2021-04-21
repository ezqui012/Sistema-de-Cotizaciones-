import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar-outside',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar-outside.component.html',
  styleUrls: ['./navbar-outside.component.css']
})
export class NavbarOutsideComponent implements OnInit {

  constructor() { }
  show: boolean = false;
  ngOnInit(): void {
  }

}
