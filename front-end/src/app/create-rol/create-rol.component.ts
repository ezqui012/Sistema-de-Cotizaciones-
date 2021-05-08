import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router'
import {  } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Permit } from '../Model/permit';
import { RegisterRolesResponse } from '../Model/roles';
import { AssignedPermit, RegisterAssignedPermitResponse } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';
import { RolesService } from '../services/roles.service';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-rol',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  permits: Array<Permit> = [];
  permitAssigned: AssignedPermit = new AssignedPermit;
  permit_id = new Array();
  //id_permission:FormControl = new FormControl('')
  //name_permission:FormControl = new FormControl('')

  messageFail = false;
  messageRegisterFailed = '';
  idRole:any;

  //private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  private pattern_name = /^[a-zA-Z]*$/;
  private pattern_des = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/

  registerForm = this.fb.group({
    //id_permit: ['', [Validators.required]],
    name_role: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(75), Validators.pattern(this.pattern_name)]],
    description_role: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100), Validators.pattern(this.pattern_des)]],
    checkAproveSol: [false],
    checkCreateCot: [false],
    checkCreateSol: [false],
    checkEditCot: [false],
    checkEditSol: [false],
    checkRegisterEmp: [false],
    checkItemGasto: [false],
    checkListSol: [false]

  });

  constructor(private router: Router,
    public _roleService: RolesService,
    public _permitService: PermitService,
    public _assignedPermit: AssignedPermitService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Registro de roles - QUOT-UMSS');
  }

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

  isValidField(field: string) {
    return (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }
  showToastSuccess(){
    this.toastr.success('Rol registrado con exito');
  }
  showToastError(){
    this.toastr.error('El nombre del Rol ya se encuentra registrado');
  }
  showToastWarning(){
    this.toastr.warning('Debe asignar al Rol al menos un permiso');
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
          //this.idRole=
          //localStorage.setItem('id-role', res.id);
          this.addAssignedPermission(res.id);

          console.log("registro el Id: " + res.id)
          this.showToastSuccess();
          this.clearInput();


        } else {
          console.log('Ocurrio un error');

        }
      },
      (error) => {
        console.log(error.message);
        this.showToastError();
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
  validCeckbox() {
    return (this.registerForm.get('checkAproveSol')?.value ||
      this.registerForm.get('checkCreateCot')?.value ||
      this.registerForm.get('checkCreateSol')?.value ||
      this.registerForm.get('checkEditSol')?.value ||
      this.registerForm.get('checkEditCot')?.value ||
      this.registerForm.get('checkRegisterEmp')?.value ||
      this.registerForm.get('checkItemGasto')?.value ||
      this.registerForm.get('checkListSol')?.value);
  }
  addAssignedPermission(idRol:number) {
    console.log("hhhhID: " +idRol);
    if (idRol !== 0) {

      var permitArray = new Array();
      permitArray = this.permit_id;
      //console.log("en el IF id YA ESTA del Rol registrado: " + permitArray.length);
      for (let i = 0; i < permitArray.length; i++) {
        this.permitAssigned.id_permission = permitArray[i];
        this.permitAssigned.id_role = idRol;
        //console.log("El ide YA ESTA del Rol registrado: " + idRol);
        let res: RegisterAssignedPermitResponse;
        this._assignedPermit.registerAssignedPermit(this.permitAssigned).subscribe(
          (data) => {
            res = data;
            if (res.res) {

            } else {
              console.log('Ocurrio un error');
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      }

      this.permit_id = [];

    }

  }
  statusCheckbox() {

    if (this.registerForm.get('checkAproveSol')?.value == true) {
      this.permit_id.push(3);
    } if (this.registerForm.get('checkCreateCot')?.value == true) {
      this.permit_id.push(1);
    } if (this.registerForm.get('checkCreateSol')?.value == true) {
      this.permit_id.push(4);
    } if (this.registerForm.get('checkEditCot')?.value == true) {
      this.permit_id.push(2);
    } if (this.registerForm.get('checkEditSol')?.value == true) {
      this.permit_id.push(5);
    } if (this.registerForm.get('checkRegisterEmp')?.value == true) {
      this.permit_id.push(8);
    } if (this.registerForm.get('checkItemGasto')?.value == true) {
      this.permit_id.push(7);
    } if (this.registerForm.get('checkListSol')?.value == true) {
      this.permit_id.push(6);
    }

    this.registerRole();

  }

  registerPermitAndRole() {

    if (this.validCeckbox()) {
      this.statusCheckbox();

    } else {
      this.showToastWarning();
    }
  }

}
