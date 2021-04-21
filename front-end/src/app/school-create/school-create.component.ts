import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-create',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  constructor(private router:Router) { }
  navigateTo(path: String){
    this.router.navigate([path]);
  }

  ngOnInit(): void {
  }

}
