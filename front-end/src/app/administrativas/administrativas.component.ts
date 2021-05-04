import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { List } from '../Model/list';

@Component({
  selector: 'app-administrativas',
  templateUrl: './administrativas.component.html',
  styleUrls: ['./administrativas.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AdministrativasComponent implements OnInit {
  contenido:any;

  show:boolean= false;

  lists:List[] =[];


  constructor(private administrativas:NgbModal,
              private router:Router, private servicio:ListService) {
                this.getAll();
                
               }
  
  
  ngOnInit(): void {
  }

  getAll(){
    this.servicio.getAll().subscribe((data)=>{
      this.lists = data;
      console.log(this.lists);
      return this.lists
    });
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

