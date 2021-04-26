import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-units-register',
  templateUrl: './units-register.component.html',
  styleUrls: ['./units-register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UnitsRegisterComponent implements OnInit {

  faculties: Faculty[] | undefined;
  showAmount:boolean=false;

  constructor(
    private service: FacultyService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getFaculties();
  }

  getFaculties(){
    this.service.allFaculties().subscribe(
      (data) => {
        this.faculties = data;
        console.log(this.faculties);
      },
      (error:any) => {
        console.log(`Error: ${error}`);
      }
    );
  }

  showInputAmout(show:boolean){
    this.showAmount =show;
  }

}
