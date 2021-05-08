import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Contactos - QUOT-UMSS');
  }

  ngOnInit(): void {
  }

}
