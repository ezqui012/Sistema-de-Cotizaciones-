import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';
import { UnitService } from '../services/unit.service';
import { RegisterUnitResponse } from '../Model/unit';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BinnacleService } from '../services/binnacle.service';

@Component({
  selector: 'app-units-register',
  templateUrl: './units-register.component.html',
  styleUrls: ['./units-register.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class UnitsRegisterComponent implements OnInit {

  faculties: Faculty[] | undefined;
  showAmount:boolean=false;
  messageFail = false;
  messageRegisterFailed = '';

  spinnerType: string | any;
  spinnerName: string | any;

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
    public toastr: ToastrService,
    private router:Router,
    private titlePage: Title,
    private spinner: NgxSpinnerService,
    private serbiceB: BinnacleService
    ) {
      this.titlePage.setTitle('Registro de unidades - QUOT-UMSS');
      this.spinnerName = 'sp3';
      this.spinnerType = 'ball-spin-clockwise';
    }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getFaculties();
  }

  getFaculties(){
    this.service.allFaculties('V').subscribe(
      (data) => {
        this.faculties = data;
        this.spinner.hide(this.spinnerName);
      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.spinner.hide(this.spinnerName);
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
      field === 'name_unit' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y alfabéticos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numéricos`;
    } else if(this.registerForm.get(field)?.hasError('minlength')){
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como mínimo el ingreso de ${minLength} caracteres`;
    } else if(this.registerForm.get(field)?.hasError('maxlength')){
      const maxLength = this.registerForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como máximo`;
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

    this.spinner.show(this.spinnerName);
    let res: RegisterUnitResponse;
    this.serviceUnit.registerUnit(this.registerForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          let binData = {
            table_name: 'units',
            action: 'Creación',
            new_data: JSON.stringify(this.registerForm.value)
          }
          this.serbiceB.storeBinnacle(binData).subscribe();
          this.spinner.hide(this.spinnerName);
          this.toastr.success('Unidad registrada con éxito');
          this.navigateTo('/unit-list')
        }else{
          this.spinner.hide(this.spinnerName);
          this.toastr.warning('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        console.log(error.message);
        this.spinner.hide(this.spinnerName);
        this.toastr.error('El nombre de la unidad ya se encuentra registrado');
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

  private translate(field: string):string|void{
    if(field === 'id_faculty'){
      return 'Facultad';
    } else if(field === 'name_unit'){
      return 'Nombre de unidad';
    } else if(field === 'type'){
      return 'Tipo de unidad'
    }else if(field === 'amount'){
      return 'Presupuesto';
    }
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
}
