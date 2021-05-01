import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Roles } from '../Model/roles';
import { RolesService } from '../services/roles.service';



@Component({
  selector: 'app-create-rol',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  roles: Array<Roles>=[]
  name_role:FormControl = new FormControl('')
  description_role:FormControl = new FormControl('')

  messageFail = false;
  messageRegisterFailed = '';

  //private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/

 /* registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
    type: ['Administrativa', [Validators.required]]
  });*/

  constructor(private router: Router,
    public _roleService: RolesService
  ) { }

  ngOnInit(): void {
  }
  //navigate
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getRole() {
    this._roleService.getRole().subscribe((role) => {
      return this.roles = role
    })
  }
  addRole(): void {
    let name_role = this.name_role.value;
    let description_role = this.description_role.value;
    this._roleService.addRole(name_role, description_role).subscribe(data => console.log(data))
    //this.getRole();
    alert("Se creo el rol ("+name_role+ ") con Exito!");
    this.name_role.setValue("");
    this.description_role.setValue("");


  }

  /*//Angular material validaciones
  isValidField(field:string){
    return ( this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.registerForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.registerForm.get(field)?.hasError('pattern')){
      field === 'name_unit' ? message = `El campo ${fieldSpanish} solo acepta caracteres numericos y alfabeticos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numericos`;
    } else if(this.registerForm.get(field)?.hasError('minlength')){
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como minimo el ingreso de ${minLength} caracteres`;
    } else if(this.registerForm.get(field)?.hasError('maxlength')){
      const maxLength = this.registerForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como maximo`;
    } else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos`;
    }

    return message;
  }

  onKeyPress(){
    if(this.messageFail && !this.registerForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  clearInput(){
    this.registerForm.get('id_faculty')?.reset();
    this.registerForm.get('name_unit')?.reset();
    this.registerForm.get('amount')?.reset();
  }

  private translate(field: string):string|void{
    if(field === 'id_faculty'){
      return 'Facultad';
    } else if(field === 'name_unit'){
      return 'Nombre de unidad';
    } else if(field === 'type'){
      return 'Tipo de unidad'
    }else if(field === 'amount'){
      return 'Monto';
    }
  }*/


}
