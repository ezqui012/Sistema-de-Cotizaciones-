import { Registeruser } from './../Model/registeruser';
import { UnitService } from './../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisteruserService } from 'src/app/services/registeruser.service';

@Component({
  selector: 'app-register-user-administrative',
  templateUrl: './register-user-administrative.component.html',
  styleUrls: ['./register-user-administrative.component.css']
})
export class RegisterUserAdministrativeComponent implements OnInit {
  registerForm: FormGroup;
  user: any;
  units: any = [];


  RegisterUser = new Registeruser();
  private isValidEmail = /\S+@\S+\.\S+/;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private RegisteruserService: RegisteruserService) {
    this.registerForm = this.formBuilder.group({
      selectRol: ['', Validators.required],
      selectUnity: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(49), Validators.minLength(15),
      ]],
      phone: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(6)]],
      ci: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)]],
      address: ['', [Validators.required, Validators.maxLength(99), Validators.minLength(29)]],
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required, Validators.maxLength(31), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
    });
  }

  getErrorMessageEmail(field: string) {
    let message;

    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('pattern')) {
      message = "El formato de correo no es valido";
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Ingrese minimo 8 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Ingrese maximo 15 caracteres";
    }
    return message;
  }
  getErrorMessageName(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 15 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 50 caracteres";
    }
    return message;

  }
  getErrorMessageCi(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 7 dígitos";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 9 dígitos";
    }
    return message;

  }
  getErrorMessageAddress(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 30 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 100 caracteres";
    }
    return message;

  }
  getErrorMessagePhone(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 7 dígitos";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 8 dígitos";
    }
    return message;
  }
  getTraduction(field: string) {
    return field === 'password' ? 'contraseña' : 'correo';
  }
  getErrorMessagePassword(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 8 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 15 caracteres";
    }
    return message;

  }

  // tslint:disable-next-line: typedef
  insertData() {
    console.log(this.RegisterUser);
    this.RegisteruserService.insertData(this.RegisterUser).subscribe(res => {
      console.log(res);
      this.OnResetForm();
    });
  }
  //load Unit DropDown
 /* getUnits(){
    this.unitService.getUnits().subscribe((unit) => {
      console.log(unit);
      return this.units = unit;
    });
  }*/

  isValid(field: string) {
    return (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }


  get f() {
    return this.registerForm.controls;

  }
  OnResetForm() {
    this.registerForm.reset();
  }
  ngOnInit(): void {
   // this.getUnits();
  }

  onSaveForm() {
    if (this.registerForm.valid) {
      this.OnResetForm();
      console.log('valid');
    } else { console.log('invalid'); }
  }
  // tslint:disable-next-line: typedef
  get userName() { return this.registerForm.controls; }


  // tslint:disable-next-line: typedef
  public inputValidator(event: any) {
    // console.log(event.target.value);
    const pattern = /^[a-zA-Z ]*$/;
    // let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
      // invalid character, prevent input

    }
  }
 /* public inputValidatorEmail(event:any){
    const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(!pattern.test(event.target.value)){
      event.targe.value = event.target.value.replace(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
    }
  }*/
  // Validar campos solo numeros
  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


}
