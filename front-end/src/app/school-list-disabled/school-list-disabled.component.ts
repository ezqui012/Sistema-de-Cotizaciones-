import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { FacultyService } from '../services/faculty.service';
import { FormControl } from '@angular/forms';
import {Faculty} from '../Model/faculty';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-school-list-disabled',
  encapsulation:ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  templateUrl: './school-list-disabled.component.html',
  styleUrls: ['./school-list-disabled.component.css']
})
export class SchoolListDisabledComponent implements OnInit {

  description_faculty:FormControl = new FormControl('')
  faculties: Array<Faculty>=[]
  pos = 0;

  spinnerType: string | any;
  spinnerName: string | any;
  pageActual: number =1;
  numItem:number = 8;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _facultyService: FacultyService,
    public config: NgbPopoverConfig,
    private titlePage: Title,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
    this.titlePage.setTitle('Lista de deshabilitados - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getFaculty();
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  openModal(content: any, pos:any){
    this.modal.open(content,{ windowClass:"colorModal"});
    this.pos = pos;
  }
  getFaculty(){
    this._facultyService.allFaculties('F').subscribe((faculty)=> {
      this.faculties = faculty;
      this.spinner.hide(this.spinnerName);
    },
    (error) => {
      this.spinner.hide(this.spinnerName);
      this.toastr.error(`ERROR: ${error} Recargue la pagina`);
    })
  }
  updateStatusData(id:number){
    this._facultyService.updateStatusData(id,'V').subscribe(
      (data) => {
        //this.spinner.hide(this.spinnerName);
        this.getFaculty();
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Regargue la pagina`);
        this.spinner.hide(this.spinnerName);
      }
    );
  }

}
