import { Registeruser } from './../Model/registeruser';
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
  unities = [];
  user: any;



  RegisterUser =  new Registeruser();
  private isValidEmail = /\S+@\S+\.\S+/;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private RegisteruserService: RegisteruserService) {
    this.registerForm = this.formBuilder.group({
      selectRol: ['', Validators.required],
      selectUnity: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(15),
      ]],
      phone: ['', [Validators.required, Validators.maxLength(7), Validators.minLength(6)]],
      ci: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)]],
      address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(30)]],
      email: ['', [ Validators.required, Validators.pattern(this.isValidEmail) ]],
      password: ['', [ Validators.required, Validators.maxLength(31), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
    });
  }

  // tslint:disable-next-line: typedef
  insertData(){
    console.log(this.RegisterUser);
    this.RegisteruserService.insertData(this.RegisterUser).subscribe(res => {
      console.log(res);
      this.OnResetForm();
    });
  }
 /* getUnities(){
    this.RegisteruserService.getUnity().subscribe((unity) => {
      return this.unities = unity;
    });
  }*/

  get f() {
    return this.registerForm.controls;

  }
   OnResetForm(){
     this.registerForm.reset();
  }
  ngOnInit(): void {
  }

  onSaveForm(){
    if(this.registerForm.valid)
    {
      this.OnResetForm();
      console.log('valid');
    }else{console.log('invalid'); }
  }
  // tslint:disable-next-line: typedef
  get userName(){return this.registerForm.controls; }


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
