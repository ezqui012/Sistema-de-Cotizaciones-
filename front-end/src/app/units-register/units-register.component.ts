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
  messageFail = false;
  messageRegisterFailed = '';

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/

  registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
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

  isValid(field:string){
    return ( this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.registerForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.registerForm.get(field)?.hasError('pattern')){
      field === 'name_unit' ? message = `El campo ${fieldSpanish} solo acepta caracteres numericos y alfabeticos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numericos`;
    } else if(this.registerForm.get(field)?.hasError('minlength')){
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como minimo el ingreso de ${minLength} caracteres`;
    } else if(this.registerForm.get(field)?.hasError('maxlength')){
      const maxLength = this.registerForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como maximo`;
    } else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos`;
    }

    return message;
  }

  showInputAmout(show:boolean){
    this.showAmount =show;
    this.registerForm.get('amount')?.reset;
    if(this.showAmount){
      this.registerForm = this.fb.group({
        id_faculty: ['', [Validators.required]],
        name_unit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
        type: ['Gasto', [Validators.required]],
        amount: ['', [Validators.required, Validators.max(9999999999.99), Validators.pattern(this.patternNumber)]]
      });
    }else{
      this.registerForm = this.fb.group({
        id_faculty: ['', [Validators.required]],
        name_unit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
        type: ['Administrativa', [Validators.required]]
      });
    }
  }

  registerUnit(){
    if(this.registerForm.invalid){
      console.log("campos invalidos");
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    console.log(this.registerForm.value);
  }

  onKeyPress(){
    if(this.messageFail && !this.registerForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  translate(field: string):string|void{
    if(field === 'id_faculty'){
      return 'Facultad';
    } else if(field === 'name_unit'){
      return 'Nombre de unidad';
    } else if(field === 'type'){
      return 'Tipo de unidad'
    }else if(field === 'amount'){
      return 'Monto';
    }
  }

}
