import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AssignedPermit, RegisterAssignedPermitResponse } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';
import { RolesService } from '../services/roles.service';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import {RegisterRolesResponse} from '../Model/roles';


@Component({
  selector: 'app-edit-rol',
  encapsulation:ViewEncapsulation.Emulated,

  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {

  messageFail = false;
  messageRegisterFailed = '';
  id:any;

  private pattern_name = /^[a-zA-Z-zñÑ\u00E0-\u00FC ]*$/
  public role:any;

  registerForm = this.fb.group({
    //id_permit: ['', [Validators.required]],
    name_role: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(75), Validators.pattern(this.pattern_name)]],
    description_role: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
    // checkAproveSol: [false],
    // checkCreateCot: [false],
    // checkCreateSol: [false],
    // checkEditCot: [false],
    // checkEditSol: [false],
    // checkRegisterEmp: [false],
    // checkItemGasto: [false],
    // checkListSol: [false]

  });
  constructor(private router:Router,

    public _roleService: RolesService,
    public _permitService: PermitService,
    public _assignedPermit: AssignedPermitService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private titlePage: Title) {
      this.titlePage.setTitle('Edición de roles - QUOT-UMSS');
    }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("recupere el id: "+this.id);
    this.getRole(this.id);
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }


  getRole(id:any){
    this._roleService.getRoleSelect(id).subscribe((data) => {
      console.log(data);
      this.role = data;

      this.registerForm.controls['name_role'].setValue(this.role.name_role);
      this.registerForm.controls['description_role'].setValue(this.role.description_role);
      this.setRoleData();

      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  setRoleData(){

      this.registerForm.controls['name_role'].setValue(this.role.name_role);
      this.registerForm.controls['description_role'].setValue(this.role.description_role);
      //SetLa asignacion de permisos
  }
  updateRole(){
    if(this.registerForm.invalid){
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: RegisterRolesResponse;
    this._roleService.updateRoleSelect(this.id, this.registerForm.value).subscribe((data) => {
        res = data;
        if(res.res){
          this.toastr.success('Se guardaron los cambios con éxito');
          this.navigateTo('/roles-list')

        }else{
          this.toastr.warning('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        this.toastr.error('El nombre de la Rol ya se encuentra registrado');
      }
    );
  }
//funciones add
  onKeyPress(){
    if(this.messageFail && !this.registerForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }
  isValid(field:string){
    return ( this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.registerForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.registerForm.get(field)?.hasError('pattern')){
      field === 'name_unit' ? message = `El campo ${fieldSpanish} solo acepta caracteresalfabéticos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numéricos`;
    } else if(this.registerForm.get(field)?.hasError('minlength')){
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como mínimo el ingreso de ${minLength} caracteres`;
    } else if(this.registerForm.get(field)?.hasError('maxlength')){
      const maxLength = this.registerForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como máximo`;
    } else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos`;
    }

    return message;
  }
  private translate(field: string):string|void{
    if(field === 'id_role'){
      return 'Facultad';
    } else if(field === 'name_role'){
      return 'Nombre de rol';
    } else if(field === 'description_role'){
      return 'Descripcion del rol';
    }
  }
}
