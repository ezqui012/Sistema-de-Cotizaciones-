import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-school-list',
  encapsulation:ViewEncapsulation.None,

  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any){
    this.modal.open(content,{ windowClass:"colorModal"});
  }
}
