import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-edit',
  encapsulation:ViewEncapsulation.Emulated,
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})
export class SchoolEditComponent implements OnInit {

  constructor(private router:Router) { }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  ngOnInit(): void {
  }

}
