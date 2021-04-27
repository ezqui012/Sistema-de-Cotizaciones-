import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-outside',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar-outside.component.html',
  styleUrls: ['./navbar-outside.component.css']
})
export class NavbarOutsideComponent implements OnInit {

  constructor(private router:Router) { }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  show: boolean = false;
  ngOnInit(): void {
  }

}
