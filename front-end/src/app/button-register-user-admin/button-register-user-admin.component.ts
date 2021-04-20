import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-button-register-user-admin',
  templateUrl: './button-register-user-admin.component.html',
  styleUrls: ['./button-register-user-admin.component.css']
})
export class ButtonRegisterUserAdminComponent  {
  miFormulario: FormGroup;

constructor() {
  this.miFormulario = new FormGroup({
    nombre: new FormControl('Jose',[ Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [
      Validators.required
    ]),
    correo: new FormControl('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  });
}


miSubmit() {
  console.log(this.miFormulario.value);
  console.log(this.miFormulario );
}



}
