import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginResponse } from '../Model/login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  private isValidEmail = /\S+@\S+\.\S+/;
  messageFail = false;
  messageLoginFailed = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router:Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.getTraduction(field);

    if(this.loginForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.loginForm.get(field)?.hasError('pattern')){
      message = "El formato de correo no es valido";
    } else if(this.loginForm.get(field)?.hasError('minlength')){
      message = "Ingrese mínimo 8 caracteres";
    } else if(this.loginForm.get(field)?.hasError('maxlength')){
      message = "Ingrese máximo 15 caracteres";
    }

    return message;
  }

  isValid(field:string){
    return ( this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid;
  }

  getTraduction(field: string){
    return field === 'password' ? 'contraseña' : 'correo';
  }

  onKeyPress(){
    if(this.messageFail && !this.loginForm.invalid && this.messageLoginFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  async onLogin(){
    if(this.loginForm.invalid){
      this.messageFail = true;
      this.messageLoginFailed = 'Existen campos incorrectos';
      return;
    }

    let res: LoginResponse;
    this.service.loginServe(this.loginForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res && res.role === 1){
          localStorage.setItem('quot-umss-tk', res.token);
          localStorage.setItem('quot-user', res.name);
          this.router.navigate(['']);
        }else if(res.res){
          this.toastr.info('Por el momento solo el Administrador tiene acceso al sistema intente mas tarde');
        }
      }, (error: any) => {
        console.log(error.message);
        this.messageFail = true;
        this.messageLoginFailed = 'El correo o la contraseña son incorrectos';
      }
    )
  }

}
