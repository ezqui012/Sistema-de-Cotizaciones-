import { Unit } from './../Model/unit';
import { Rol } from './../Model/rol';
import { Registeruser } from './../Model/registeruser';
import { UnitService } from './../services/unit.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import { RolDropdownService } from '../services/rol-dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register-user-administrative',
  templateUrl: './register-user-administrative.component.html',
  styleUrls: ['./register-user-administrative.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterUserAdministrativeComponent implements OnInit {
  user: any;
  units: Unit []|undefined;
  roles: Rol []|undefined;
  email: any;
  ci: any;
  RegisterUser = new Registeruser();
  submitted = false;
  registerForm = this.formBuilder.group({
    id_role: ['', [Validators.required]],
    id_unit: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(15),
    ]],
    phone: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7),Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    ci: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(7), Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(/\S+@\S+\.\S+/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
  });
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  //fb=formbuilder esta en el import
  constructor(private formBuilder: FormBuilder, private RegisteruserService: RegisteruserService,
     public unitService: UnitService, public rolService: RolDropdownService, public toastr: ToastrService,private router:Router,
     private titlePage: Title) {
      this.titlePage.setTitle('Registro de personal - QUOT-UMSS');
    }
  showToastrErrorEmail(){
    this.toastr.error('El correo ya est?? en uso','Campo Inv??lido');
  }
  showToastrErrorCi(){
    this.toastr.error('El ci ya est?? en uso');
  }
  showToastSuccess(){
    this.toastr.success('Se registraron los datos con ??xito');
  }

  getErrorMessageEmail(field: string) {
    let message;

    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo correo es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "Ingrese minimo 8 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "Ingrese maximo 100 caracteres";
    }  else if (this.registerForm.get(field)?.hasError('pattern')) {
      message = "Ingrese un correo valido, ejemplo: Carlos@gmail.com";
    }
    return message;
  }
  getErrorMessageName(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo Nombre Completo es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 15 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 100 caracteres";
    }
    return message;

  }

  getErrorMessageCi(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo Ci es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 7 d??gitos";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 9 d??gitos";
    } else if(this.registerForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite d??gitos"
    }
    return message;

  }
  getErrorMessageAddress(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo direcci??n es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 30 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 100 caracteres";
    }
    return message;

  }
  getErrorMessagePhone(field: string) {
    let message;
    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo Tel??fono es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 7 d??gitos";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 8 d??gitos";
    } else if(this.registerForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite d??gitos"
    }
    return message;
  }
  getTraduction(field: string) {
    return field === 'password' ? 'contrase??a' : 'correo';
  }
  getErrorMessagePassword(field: string) {
    let message;

    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo contrase??a es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 8 caracteres";
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 32 caracteres";
    } else if( this.registerForm.get(field)?.hasError('pattern')){
      message = "La contrase??a debe tener al menos una letra min??scula, al menos una letra may??scula y al menos un d??gito";

    }
    return message;

  }
  insertData() {
    this.registerForm.controls['address'].setValue(this.registerForm.get('address')?.value.trim())
    this.registerForm.controls['name'].setValue(this.registerForm.get('name')?.value.trim())
    this.registerForm.controls['password'].setValue(this.registerForm.get('password')?.value.trim())
    this.registerForm.controls['email'].setValue(this.registerForm.get('email')?.value.trim())
    if(this.registerForm.invalid){
      return
    }
    this.getEmail();
  }
  //load Unit DropDown
  getEmail(){
    this.RegisteruserService.getEmail(this.registerForm.get('email')?.value).subscribe((res: any) => {
    this.email = res;
    this.getCi();
  })

  }
  getCi(){
    this.RegisteruserService.getCi(this.registerForm.get('ci')?.value).subscribe((res: any) => {
      this.ci = res;
      this.compare();
    })
  }

  splitData(){

  }
  compare(){
    if(this.email===null){
      console.log(this.ci+'ci');
      if(this.ci===null){
          this.RegisteruserService.insertData(this.registerForm.value).subscribe(res => {
          this.showToastSuccess();
          this.registerForm.reset();
        });
      }else{
        this.showToastrErrorCi();
      }

    }else{
      this.showToastrErrorEmail();
    }

  }
  getUnits(){
    this.unitService.getUnits().subscribe((unit) => {

      return this.units = unit;
    });
  }
  getRoles(){
    this.rolService.getRoles().subscribe((rol) => {
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
//   onKeyPress(event: any) {
//     const regexpNumber = /[0-9\+\-\ ]/;
//     let inputCharacter = String.fromCharCode(event.charCode);
//     if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
//       event.preventDefault();
//     }
//   }

//   _keyUp(event: any) {
//     const pattern = /[0-9\+\-\ ]/;
//     let inputChar = String.fromCharCode(event.charCode);

//     if (!pattern.test(inputChar)) {
//       // invalid character, prevent input
//       event.preventDefault();
//     }
// }



}
