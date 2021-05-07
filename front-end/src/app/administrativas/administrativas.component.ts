import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { FormControl } from '@angular/forms';
import { ListUnit } from '../Model/list';

@Component({
  selector: 'app-administrativas',
  templateUrl: './administrativas.component.html',
  styleUrls: ['./administrativas.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AdministrativasComponent implements OnInit {
  contenido:any;

  show:boolean= false;

  description_list:FormControl = new FormControl('')
  gastoUnit: Array<ListUnit>=[]
  administrativoUnit: Array<ListUnit>=[]
  pos = 0;


  constructor(private administrativas:NgbModal,
              private router:Router, private servicio:ListService, 
              public _listService: ListService) {
                
               }
  
  
  ngOnInit(): void {
    this.getList();
    this.getListAdministrativa();
    
  }

  getList(){
    this._listService.gatoUnit().subscribe((list)=> {
      console.log(list)
      return this.gastoUnit = list

    })
  }

  getListAdministrativa(){
    this._listService.administrativoUnit().subscribe((list)=> {
      console.log(list)
      return this.administrativoUnit = list

    })
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

