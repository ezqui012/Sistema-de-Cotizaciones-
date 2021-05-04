import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Permit } from '../Model/permit';
import { Roles, Register_Role, RegisterRolesResponse } from '../Model/roles';
import { PermitService } from '../services/permit.service';
import { RolesService } from '../services/roles.service';



@Component({
  selector: 'app-create-rol',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  permits: Array<Permit>=[];
  //id_permission:FormControl = new FormControl('')
  //name_permission:FormControl = new FormControl('')

  messageFail = false;
  messageRegisterFailed = '';

  //private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  private pattern_name = /^[a-zA-Z]*$/;
  private pattern_des = /^[a-zA-Z-ñÑ]*$/;

  registerForm = this.fb.group({
    //id_permit: ['', [Validators.required]],
    name_role: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(75), Validators.pattern(this.pattern_name)]],
    description_role: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(100), Validators.pattern(this.pattern_des)]],
  });

  constructor(private router: Router,
    public _roleService: RolesService,
    public _permitService: PermitService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPermit();
  }
  //navigate
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getPermit() {
    this._permitService.allPermit().subscribe((permit) => {
      return this.permits = permit
   })
  }

  // addRole(): void {
  //   let name_role = this.name_role.value;
  //   let description_role = this.description_role.value;
  //   this._roleService.addRole(name_role, description_role).subscribe(data => console.log(data))
  //   //this.getRole();
  //   alert("Se creo el rol ("+name_role+ ") con Exito!");
  //   this.name_role.setValue("");
  //   this.description_role.setValue("");


  // }

  //Angular material validaciones
  isValidField(field: string) {
    return (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  registerRole() {
    if (this.registerForm.invalid) {
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: RegisterRolesResponse;
    this._roleService.registerRoles(this.registerForm.value).subscribe(
      (data) => {
        res = data;
        if (res.res) {
          alert('Rol registrada con exito');
          this.clearInput();
        } else {
          console.log('Ocurrio un error');
        }
      },
      (error) => {
        console.log(error.message);
        this.messageRegisterFailed = 'El nombre de la unidad ya se encuentra registrado'
        this.messageFail = true;
      }
    );
  }

  getErrorMessage(field: string) {
    let message;
    let fieldSpanish = this.translate(field);

    if (this.registerForm.get(field)?.errors?.required) {
      message = `El campo ${fieldSpanish} es obligatorio`;
    } else if (this.registerForm.get(field)?.hasError('pattern')) {
      field === 'name_role' ? message = `El campo ${fieldSpanish} solo acepta caracteres alfabeticos`
        : message = `El campo ${fieldSpanish} solo acepta caracteres alfabeticos`;
    } else if (this.registerForm.get(field)?.hasError('minlength')) {
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como minimo el ingreso de ${minLength} caracteres`;
    } else if (this.registerForm.get(field)?.hasError('maxlength')) {
      const maxLength = this.registerForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como maximo`;
    } else if (this.registerForm.get(field)?.hasError('max')) {
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos`;
    }

    return message;
  }

  onKeyPress() {
    if (this.messageFail && !this.registerForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos') {
      this.messageFail = false;
    } else if (this.messageFail) {
      this.messageFail = false;
    }
  }

  clearInput() {
    this.registerForm.get('id_role')?.reset();
    this.registerForm.get('name_role')?.reset();
    this.registerForm.get('description_role')?.reset();
  }

  private translate(field: string): string | void {
    if (field === 'id_role') {
      return 'Rol';
    } else if (field === 'name_role') {
      return 'Nombre de rol';
    } else if (field === 'description_role') {
      return 'Descripción de Rol'
    }
  }


}
