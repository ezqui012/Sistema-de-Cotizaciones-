import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';
import { ValidationAmount } from '../utils/validation-amount';

@Component({
  selector: 'app-units-register',
  templateUrl: './units-register.component.html',
  styleUrls: ['./units-register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UnitsRegisterComponent implements OnInit {

  faculties: Faculty[] | undefined;
  showAmount:boolean=false;

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;

  registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required, Validators.maxLength(100)]],
    type: ['Administrativa', [Validators.required]]
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
    this.registerForm.get('amount')?.reset;
    if(this.showAmount){
      this.registerForm = this.fb.group({
        id_faculty: ['', [Validators.required]],
        name_unit: ['', [Validators.required, Validators.maxLength(100)]],
        type: ['Gasto', [Validators.required]],
        amount: [null, [ValidationAmount.isVisible(this.showAmount), Validators.maxLength(3), Validators.pattern(this.patternNumber)]]
      });
    }else{
      this.registerForm = this.fb.group({
        id_faculty: ['', [Validators.required]],
        name_unit: ['', [Validators.required, Validators.maxLength(100)]],
        type: ['Administrativa', [Validators.required]]
      });
    }
  }

  mostrar(){
    console.log(this.registerForm.value);
  }

}
