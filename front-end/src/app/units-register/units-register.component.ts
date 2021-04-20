import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-units-register',
  templateUrl: './units-register.component.html',
  styleUrls: ['./units-register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UnitsRegisterComponent implements OnInit {

  showAmount:boolean=false;

  constructor() {

  }

  ngOnInit(): void {
  }

  showInputAmout(show:boolean){
    this.showAmount =show;
  }

}
