import { PasswordComponent } from './../PopUp/password/password.component';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUserService } from './../services/PersonalUser.service';
import { EditUserService } from './../services/edit-user.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from './../Model/unit';
import { Rol } from './../Model/rol';
import { Registeruser, UpdatePassword } from './../Model/registeruser';
import { UnitService } from './../services/unit.service';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import { RolDropdownService } from '../services/rol-dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public id= this.route.snapshot.params.id;
  spinnerType: string | any;
  spinnerName: string | any;
  dataToUpdate: any;
  user: any;
  units: Unit []|undefined;
  roles: Rol []|undefined;
  email: any;
  ci: any;
  pass1:any;
  pass2:any;
  upPassword = new UpdatePassword();
  RegisterUser = new Registeruser();
  phone='231313';
  pos= 0;
  updatePassForm = this.formBuilder.group({
    pass1: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
    pass2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
  });


  updateForm = this.formBuilder.group({
    id:[''],
    id_role: ['', [Validators.required]],
    id_unit: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(15),
    ]],
    phone: ['', [Validators.required, Validators.maxLength(8),
                 Validators.minLength(7), Validators.pattern('^[0-9]*$')]],
    ci: ['', [Validators.required, Validators.maxLength(9),
              Validators.minLength(7), Validators.pattern('[0-9]*')]],
    address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(/\S+@\S+\.\S+/)]]

  });
  getName(){
    return this.updateForm.get('name')?.value;
  }


  navigateTo(path: String){
    this.router.navigate([path]);
  }
  //fb=formbuilder esta en el import
  constructor(private formBuilder: FormBuilder,
    private RegisteruserService: RegisteruserService,
    private unitService: UnitService,
    private rolService: RolDropdownService,
    private toastr: ToastrService,
    private router:Router,
    private updateService: EditUserService,
    private route : ActivatedRoute,
    private userDataService : PersonalUserService,
    private modal: NgbModal,
    private passwordService : EditUserService,
    private spinner: NgxSpinnerService
    ) {
      this.spinnerName = 'sp3';
      this.spinnerType = 'ball-spin-clockwise';
    }
  ngOnInit(): void {
     // console.log(this.route.snapshot.params.id);
      this.id
      this.getDataUser();
      this.getUnits();
      this.getRoles();
      this.spinner.show(this.spinnerName);
     // console.log(this.id);

    }

    editPassword(){
      const ref =this.modal.open(PasswordComponent)
      ref.componentInstance.idUser = this.route.snapshot.params.id;
      ref.result.then((yes)=>{
        console.log('Yes');
      },(cancel)=>{
        console.log('Cancel');
      })

    }

  showToastrErrorEmail(){
    this.toastr.error('El email ya est?? en uso','Campo Inv??lido');
  }
  showToastrErrorCi(){
    this.toastr.error('El ci ya est?? en uso');
  }
  showToastSuccess(){
    this.toastr.success('Se guardaron los cambios con ??xito');
  }
  getErrorMessageEmail(field: string) {
    let message;

    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo correo es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Ingrese minimo 8 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Ingrese maximo 100 caracteres";
    }  else if (this.updateForm.get(field)?.hasError('pattern')) {
      message = "Ingrese un email valido, ejemplo: Carlos@gmail.com";
    }
    return message;
  }
  verifyPasswordMessage(field:string){
    let message;
    if (this.updatePassForm.get(field)?.errors?.required) {
      message = `El campo Ingresar nueva contrase??a es obligatorio`;
    } else if (this.updatePassForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 8 caracteres";
    } else if (this.updatePassForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 32 caracteres";
    } else if( this.updatePassForm.get(field)?.hasError('pattern')){
      message = "La contrase??a debe tener al menos una letra min??scula, al menos una letra may??scula y al menos un d??gito";

    }
    return message;

  }

  getErrorMessageName(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo Nombre Completo es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 15 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 100 caracteres";
    }
    return message;

  }

  getErrorMessageCi(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo Ci es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 7 d??gitos";
    }else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo 9 d??gitos";
    }else if(this.updateForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite d??gitos"
    }
    return message;

  }
  getErrorMessageAddress(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo direcci??n es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 30 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 100 caracteres";
    }
    return message;

  }
  getErrorMessagePhone(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo tel??fono es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 7 d??gitos";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 8 d??gitos";
    } else if(this.updateForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite d??gitos"
    }
    return message;
  }
  getTraduction(field: string) {
    return field === 'password' ? 'contrase??a' : 'correo';
  }

  getDataUser(){
    this.userDataService.getDataUserByID(this.id).subscribe((res: any) =>{
      this.dataToUpdate = res;
      this.RegisterUser = this.dataToUpdate;
      this.updateForm.controls['id_role'].setValue(this.RegisterUser.id_role);
      this.updateForm.controls['id_unit'].setValue(this.RegisterUser.id_unit);
      this.upPassword = this.dataToUpdate;
      this.updateForm.controls['id'].setValue(this.upPassword.id);
      this.spinner.hide(this.spinnerName);

    })
  }
  updateDataUser(){

    console.log(this.updateForm.get('id_role')?.value)
    this.updateForm.controls['address'].setValue(this.updateForm.get('address')?.value.trim())
    this.updateForm.controls['name'].setValue(this.updateForm.get('name')?.value.trim())

    this.updateForm.controls['email'].setValue(this.updateForm.get('email')?.value.trim())

    if(this.updateForm.invalid){
      return
    }
    this.updateService.updateData(this.id, this.updateForm.value).subscribe(res=>{
      this.showToastSuccess();

      },
      (error: any)=>{
         let message= error;
         this.repitData(message);
      }

      );

  }
  repitData(message: any){
    try {
      if(message.error.errors.email[0]){
        this.toastr.error(message.error.errors.email[0]);
      }
      if(message.error.errors.ci[0]){
        this.toastr.error(message.error.errors.ci[0]);
      }
    } catch (error) {
      if(message.error.errors.ci[0]){
          this.toastr.error(message.error.errors.ci[0]);
        }
    }
  }
  insertData() {
    this.getEmail();
  }
  //load Unit DropDown
  getEmail(){
    this.RegisteruserService.getEmail(this.updateForm.get('email')?.value).subscribe((res: any) => {
    this.email = res;
    this.getCi();
    });

  }
  getCi(){
    this.RegisteruserService.getCi(this.updateForm.get('ci')?.value).subscribe((res: any) => {
      this.ci = res;
      this.compare();
    })

  }
  compare(){
    if(this.email===null){
      console.log(this.ci+'ci');
      if(this.ci===null){
          console.log(this.id +'ids');
          console.log(this.RegisterUser);
          this.updateService.updateData(this.id, this.RegisterUser).subscribe(res=>{
            this.showToastSuccess();
          })
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
    return (this.updateForm.get(field)?.touched || this.updateForm.get(field)?.dirty) && !this.updateForm.get(field)?.valid;
  }

  OnResetForm() {
    this.updateForm.reset();
  }


  onSaveForm() {
    if (this.updateForm.valid) {
      this.OnResetForm();
      console.log('valid');
    } else { console.log('invalid'); }
  }
  // tslint:disable-next-line: typedef
  get userName() { return this.updateForm.controls; }


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

  getErrorMessagePassword(field: string) {
    let message;

    if (this.updatePassForm.get(field)?.errors?.required) {
      message = `El campo es obligatorio`;
    } else if (this.updatePassForm.get(field)?.hasError('minlength')) {
      message = "M??nimo 8 caracteres";
    } else if (this.updatePassForm.get(field)?.hasError('maxlength')) {
      message = "M??ximo de 32 caracteres";
    } else if( this.updatePassForm.get(field)?.hasError('pattern')){
      message = "La contrase??a debe tener al menos una letra min??scula, al menos una letra may??scula y al menos un d??gito";

    }
    return message;

  }





  openModal(content: any, id: any) {
    this.modal.open(content, { windowClass: "colorModal" });
    this.saveNewPassword(id);

  }
  close(){
  }
  saveNewPassword(id:any){
    if(this.updatePassForm.invalid){
      return;
    }
    this.passwordService.changePassword(this.id, this.upPassword).subscribe(res=>{
       this.showToastSuccess();
    })
    console.log(this.id);
  }
  confirmPasswordMessage(field1:string, field2:string){
    let message;
    if (this.updatePassForm.get(field1)?.errors?.required) {
      message = `El campo es obligatorio`;
    }else if(this.updatePassForm.get(field2)!=this.updatePassForm.get(field1)){
      message="Las contrase??as no coinciden"
    }

    return message;
  }

// onlyNumber(evt: any) {
//   evt = (evt) ? evt : window.event;
//   var charCode = (evt.which) ? evt.which : evt.keyCode;
//   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//       return false;
//   }
//   return true;
// }






}
