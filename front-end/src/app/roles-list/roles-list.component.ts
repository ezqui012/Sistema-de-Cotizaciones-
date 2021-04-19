import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-list',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any){
    this.modal.open(content,{ windowClass:"oscuro"});
  }
  confir(){
    alert("Seguro que quiere crear el Rol?");
  }


}
