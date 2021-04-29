import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrativas',
  templateUrl: './administrativas.component.html',
  styleUrls: ['./administrativas.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AdministrativasComponent implements OnInit {
  contenido:any;

  show:boolean= false;


  constructor(private administrativas:NgbModal,
              private router:Router) { }
  
  
  ngOnInit(): void {
  }
  
  navigateTo(path: String){
    this.router.navigate([path]);
  }

  openSM(contenido:any){
    this.administrativas.open(contenido,{size:'sm'})
  }

  showtable(show:boolean){
     this.show= show;
  }

  
}

