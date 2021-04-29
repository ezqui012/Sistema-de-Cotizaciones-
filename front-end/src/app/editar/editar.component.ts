import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  show:boolean= false;

  constructor() { }

  ngOnInit(): void {
  }

  showRadio(show:boolean){
    this.show= show;
 }

}
