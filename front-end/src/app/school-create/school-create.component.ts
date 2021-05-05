import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FacultyService } from '../services/faculty.service';
import { ResponseRegister } from '../Model/faculty';

@Component({
  selector: 'app-school-create',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/;
  private patternNumber = /^[0-9]+/;
  private patternEmail = /\S+@\S+\.\S+/;
  private patternNameDean = /^[a-zA-Z-zñÑ\u00E0-\u00FC ]*$/;

  messageFail = false;
  messageRegisterFailed = '';

  facultyRegisterForm = this.fb.group({
    name_faculty: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(this.patternName)]],
    phone_faculty: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(this.patternNumber)]],
    email_faculty: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(this.patternEmail)]],
    address_faculty: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
    dean_faculty: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(this.patternNameDean)]]
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service: FacultyService
  ) { }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  ngOnInit(): void {
  }

  isValid(field:string){
    return ( this.facultyRegisterForm.get(field)?.touched || this.facultyRegisterForm.get(field)?.dirty) && !this.facultyRegisterForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.facultyRegisterForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.facultyRegisterForm.get(field)?.hasError('pattern')){
      (field === 'name_faculty' || field === 'address_faculty') ? message = `El campo ${fieldSpanish} solo acepta caracteres numericos y alfabeticos`
      : field === 'phone_faculty' ? message = `El campo ${fieldSpanish} solo acepta caracteres numericos` :
      field === 'email_faculty' ? message = `El campo ${fieldSpanish} solo acepta correos electronicos` :
      message = `El campo ${fieldSpanish} solo acpeta caracteres alfabeticos`;
    } else if(this.facultyRegisterForm.get(field)?.hasError('minlength')){
      const minLength = this.facultyRegisterForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como minimo el ingreso de ${minLength} caracteres`;
    } else if(this.facultyRegisterForm.get(field)?.hasError('maxlength')){
      const maxLength = this.facultyRegisterForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como maximo`;
    }

    return message;
  }

  register(){
    if(this.facultyRegisterForm.invalid){
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: ResponseRegister;
    this.service.registerFaculty(this.facultyRegisterForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          alert('Facultad registrada con exito');
        }else{
          alert('Ocurrio un error');
        }
      },
      (error) => {
        console.log(error.message);
        this.messageRegisterFailed = 'El nombre de la facultad ya se encuentra registrado'
        this.messageFail = true;
      }
    );
  }

  onKeyPress(){
    if(this.messageFail && !this.facultyRegisterForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  private translate(field: string): string|void{
    if(field === 'name_faculty'){
      return 'Nombre de facultad';
    }else if(field === 'phone_faculty'){
      return 'Telefóno de la facultad';
    }else if(field === 'email_faculty'){
      return 'Correo de la facultad';
    }else if(field === 'address_faculty'){
      return 'Dirección de la facultad';
    }else if(field === 'dean_faculty'){
      return 'Decano de la facultad';
    }
  }
}
