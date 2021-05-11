import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-support',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Soporte - QUOT-UMSS');
   }

  ngOnInit(): void {
  }

}
