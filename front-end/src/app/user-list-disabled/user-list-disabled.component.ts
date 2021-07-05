import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUserService } from '../services/PersonalUser.service';
import {PersonalUser} from '../Model/personalUser'
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list-disabled',
  encapsulation:ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  templateUrl: './user-list-disabled.component.html',
  styleUrls: ['./user-list-disabled.component.css']
})
export class UserListDisabledComponent implements OnInit {

  personalUser: Array<PersonalUser>=[]
  pos = 0;
  spinnerType: string | any;
  spinnerName: string | any;
  chkAproveSol:boolean = false;
  pageActual: number =1;
  numItem:number = 8;

  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    public config: NgbPopoverConfig,
    public toastr: ToastrService,
    private titlePage: Title,
    private spinner: NgxSpinnerService
  ) {
        this.titlePage.setTitle('Lista de usuarios - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
   }

  ngOnInit(): void {
    this.getPersonalUser();
    this.spinner.show(this.spinnerName);
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any, pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }
  getPersonalUser(){

    this._personalUserService.allPersonal('F').subscribe(
      (users)=> {
      this.spinner.hide(this.spinnerName);
      //console.log(users)

      this.personalUser = users
    },
    (error) => {
      this.toastr.error(`ERROR: ${error} Regargue la pagina`);
      this.spinner.hide(this.spinnerName);
    }


    );
  }
  disabledUser(id:number){
    this._personalUserService.updateStatusData(id,'V').subscribe(
      (data) => {
        //this.spinner.hide(this.spinnerName);
        this.getPersonalUser();
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Regargue la pagina`);
        this.spinner.hide(this.spinnerName);
      }
    );
  }

}
