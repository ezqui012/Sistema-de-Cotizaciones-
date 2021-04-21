import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  show: boolean = false;
  ngOnInit(): void {
  }


}
