import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class EditarComponent implements OnInit {

  faculties: Faculty[] | undefined;
  showAmount:boolean=false;

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;

  registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required], Validators.maxLength(100)],
    type: ['Administrativa', [Validators.required]],
    amount: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.patternNumber)]]
  });

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
