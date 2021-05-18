import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  constructor(
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
  }
  openModal(content: any){
    this.modal.open(content,{ windowClass:"colorModal"});
  }
}
