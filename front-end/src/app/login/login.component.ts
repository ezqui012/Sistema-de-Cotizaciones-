import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginResponse } from '../Model/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  messageFail = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService
  ) {}

  ngOnInit(): void {
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.getTraduction(field);

    if(this.loginForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.loginForm.get(field)?.hasError('pattern')){
      message = "Fomrato de correo no es valido";
    } else if(this.loginForm.get(field)?.hasError('minlength')){
      message = "Ingrese minimo 8 caracteres";
    }

    return message;
  }

  isValid(field:string){
    return ( this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid;
  }

  getTraduction(field: string){
    return field === 'password' ? 'contraseña' : 'correo';
  }

  async onLogin(){
    if(this.loginForm.invalid){
      return;
    }

    let res: LoginResponse;
    this.service.loginServe(this.loginForm.value).subscribe(
      (data) => {
        res = data;
        localStorage.setItem('quot-umss-tk', res.token);
        console.log(`Token ${res.token}`);
        console.log(this.messageFail);
      }, (error: any) => {
        console.log(`nel pastel ${error.message}`);
        this.messageFail = true;
        console.log(this.messageFail);
      }
    )
  }

}
