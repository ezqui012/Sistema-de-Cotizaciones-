import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { FacultyService } from '../services/faculty.service';
import { FormControl } from '@angular/forms';
import {Faculty} from '../Model/faculty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-school-list',
  encapsulation:ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  description_faculty:FormControl = new FormControl('')
  faculties: Array<Faculty>=[]
  pos = 0;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _facultyService: FacultyService,
    public config: NgbPopoverConfig,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Lista de facultades - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
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
    this._facultyService.allFaculties().subscribe((faculty)=> {
      return this.faculties = faculty

    })
  }
}
