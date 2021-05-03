import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
