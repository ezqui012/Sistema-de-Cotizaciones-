import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-list',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content: any){
    this.modal.open(content,{size:'sm', windowClass:"oscuro"});
  }
  confirmar(){
    alert("Seguro que quiere crear el Rol?");
  }

}
