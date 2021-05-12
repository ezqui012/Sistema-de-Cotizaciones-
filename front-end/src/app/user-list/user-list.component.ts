import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUserService } from '../services/PersonalUser.service';
import { FormControl } from '@angular/forms';
import {PersonalUser} from '../Model/personalUser'

@Component({
  selector: 'app-user-list',
  encapsulation:ViewEncapsulation.Emulated,

  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],

})
export class UserListComponent implements OnInit {

  //description_faculty:FormControl = new FormControl('')
  personalUser: Array<PersonalUser>=[]
  pos = 0;
  chkAproveSol:boolean = false;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService
  ) {

  }

  ngOnInit(): void {
    this.getPersonalUser();
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any, pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }
  getPersonalUser(){
    this._personalUserService.allPersonal().subscribe((users)=> {
      return this.personalUser = users

    })
  }


}
