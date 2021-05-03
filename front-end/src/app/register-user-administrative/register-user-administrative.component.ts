import { Unit } from './../Model/unit';
import { Rol } from './../Model/rol';
import { Registeruser } from './../Model/registeruser';
import { UnitService } from './../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import { RolDropdownService } from '../services/rol-dropdown.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-user-administrative',
  templateUrl: './register-user-administrative.component.html',
  styleUrls: ['./register-user-administrative.component.css']
})
export class RegisterUserAdministrativeComponent implements OnInit {
  user: any;
  units: Unit []|undefined;
  roles: Rol []|undefined;
  email: any;
  ci: any;
  RegisterUser = new Registeruser();
  private isValidEmail = /\S+@\S+\.\S+/;
  submitted = false;
  registerForm = this.formBuilder.group({
    id_role: ['', [Validators.required]],
    id_unit: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(49), Validators.minLength(15),
    ]],
    phone: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)]],
    ci: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(7)]],
    address: ['', [Validators.required, Validators.maxLength(99), Validators.minLength(29)]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.maxLength(31), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
  });
  //fb=formbuilder esta en el import
  constructor(private formBuilder: FormBuilder, private RegisteruserService: RegisteruserService,
     public unitService: UnitService, public rolService: RolDropdownService, public toastr: ToastrService) {
  }
  showToastrErrorEmail(){
    this.toastr.success('El email ya está en uso');
  }
  showToastrErrorCi(){
    this.toastr.error('El ci ya está en uso');
  }
  showToastSuccess(){
    this.toastr.success('Se registraron los datos con exito');
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

    console.log(this.registerForm.value);
    this.getEmail();
    this.getCi();
    if(this.email===null){
      if(this.ci===null){
          this.RegisteruserService.insertData(this.registerForm.value).subscribe(res => {
          this.showToastSuccess();
          console.log(res);
          this.OnResetForm();
        });
      }else{
        this.showToastrErrorCi();
        console.log('El ci ya existe');
      }

    }else{
      this.showToastrErrorEmail();
      console.log('El email ya existe');
    }

  }
  //load Unit DropDown
  getEmail(){
    this.RegisteruserService.getEmail(this.registerForm.get('email')?.value).subscribe((res) => {
    this.email = res;
    })
  }
  getCi(){
    this.RegisteruserService.getCi(this.registerForm.get('ci')?.value).subscribe((res) => {
      this.ci = res;
    })
  }
  getUnits(){
    this.unitService.getUnits().subscribe((unit) => {
      console.log(unit);
      return this.units = unit;
    });
  }
  getRoles(){
    this.rolService.getRoles().subscribe((rol) => {
      console.log(rol);
      return this.roles = rol;
    });

  }

  isValid(field: string) {
    return (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  OnResetForm() {
    this.registerForm.reset();
  }
  ngOnInit(): void {
    this.getUnits();
    this.getRoles();
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
  // Validar campos solo numeros
  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


}
