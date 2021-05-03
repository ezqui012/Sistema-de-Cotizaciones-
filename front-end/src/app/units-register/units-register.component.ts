import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';
import { UnitService } from '../services/unit.service';
import { RegisterUnitResponse } from '../Model/unit';
import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder,
    private serviceUnit: UnitService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getFaculties();
  }

  getFaculties(){
    this.service.allFaculties().subscribe(
      (data) => {
        this.faculties = data;
      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
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
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: RegisterUnitResponse;
    this.serviceUnit.registerUnit(this.registerForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          this.toastr.success('Unidad registrada con exito');
          this.clearInput();
        }else{
          this.toastr.error('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        console.log(error.message);
        this.toastr.error('El nombre de la unidad ya se encuentra registrado');
        // this.messageRegisterFailed = 'El nombre de la unidad ya se encuentra registrado'
        // this.messageFail = true;
      }
    );
  }

  onKeyPress(){
    if(this.messageFail && !this.registerForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  clearInput(){
    this.registerForm.get('id_faculty')?.reset();
    this.registerForm.get('name_unit')?.reset();
    this.registerForm.get('amount')?.reset();
  }

  private translate(field: string):string|void{
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
