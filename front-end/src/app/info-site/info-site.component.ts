import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-info-site',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './info-site.component.html',
  styleUrls: ['./info-site.component.css']
})
export class InfoSiteComponent implements OnInit {

  constructor(
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Acerca del sitio - QUOT-UMSS');
  }

  ngOnInit(): void {
  }

}
