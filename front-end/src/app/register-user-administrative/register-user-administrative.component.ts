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
  user:any;
  RegisterUser =  new Registeruser();
  private isValidEmail = /\S+@\S+\.\S+/;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private RegisteruserService: RegisteruserService) {
    this.registerForm = this.formBuilder.group({
      completeName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(15),
                      ]],
      selectRol: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)], Validators.min(7)],
      ciNumber: ['', Validators.required, Validators.maxLength(7), Validators.minLength(9)],
      address: ['', Validators.required, Validators.maxLength(100), Validators.minLength(30)],
      userEmail: ['', [Validators.required, Validators.pattern(this.isValidEmail) ]]
    });
  }

  insertData(){
    this.RegisteruserService.insertData().subscribe(res => {
      console.log(res);
    });
  }

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
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
      // invalid character, prevent input

    }


  }

  // tslint:disable-next-line: typedef
  public inputValidatorNumber(event: any) {
    const patternNumbers = /^[0-9]*$/;
    if (!patternNumbers.test(event.target.value)){
      event.target.value = event.target.value.replace(/[0-9]/g);
    }
  }
  registerUser():void{
    let userName = this.userName.value;


  }


}
