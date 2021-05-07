import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class EditarComponent implements OnInit {

  
  showAmount:boolean=false;

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;

  registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required], Validators.maxLength(100)],
    type: ['Administrativa', [Validators.required]],
    amount: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.patternNumber)]]
  });

  constructor(
    
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    
  }

  
  showInputAmout(show:boolean){
    this.showAmount =show;
  }

}
