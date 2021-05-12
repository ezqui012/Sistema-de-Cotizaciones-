import { PersonalUserService } from './../services/PersonalUser.service';
import { EditUserService } from './../services/edit-user.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from './../Model/unit';
import { Rol } from './../Model/rol';
import { Registeruser } from './../Model/registeruser';
import { UnitService } from './../services/unit.service';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import { RolDropdownService } from '../services/rol-dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id:any;
  dataToUpdate: any;
  user: any;
  units: Unit []|undefined;
  roles: Rol []|undefined;
  email: any;
  ci: any;
  RegisterUser = new Registeruser();
  submitted = false;
  updateForm = this.formBuilder.group({
    id_role: ['', [Validators.required]],
    id_unit: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(15),
    ]],
    phone: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7),Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    ci: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(7), Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(/\S+@\S+\.\S+/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
  });
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
    private userDataService : PersonalUserService
    ) {}
  ngOnInit(): void {
      console.log(this.route.snapshot.params.id);
      this.id = this.route.snapshot.params.id;
      this.getData();
      this.getUnits();
      this.getRoles();
    }
  showToastrErrorEmail(){
    this.toastr.error('El email ya está en uso','Campo Inválido');
  }
  showToastrErrorCi(){
    this.toastr.error('El ci ya está en uso');
  }
  showToastSuccess(){
    this.toastr.success('Se registraron los datos con éxito');
  }
  getErrorMessageEmail(field: string) {
    let message;

    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Ingrese minimo 8 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Ingrese maximo 100 caracteres";
    }  else if (this.updateForm.get(field)?.hasError('pattern')) {
      message = "Ingrese un email valido, ejemplo: Carlos@gmail.com";
    }
    return message;
  }
  getErrorMessageName(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 15 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 100 caracteres";
    }
    return message;

  }

  getErrorMessageCi(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 7 dígitos";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 9 dígitos";
    } else if(this.updateForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite dígitos"
    }
    return message;

  }
  getErrorMessageAddress(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 30 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 100 caracteres";
    }
    return message;

  }
  getErrorMessagePhone(field: string) {
    let message;
    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 7 dígitos";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 8 dígitos";
    } else if(this.updateForm.get(field)?.hasError('pattern')){
      message = "El campo solo admite dígitos"
    }
    return message;
  }
  getTraduction(field: string) {
    return field === 'password' ? 'contraseña' : 'correo';
  }
  getErrorMessagePassword(field: string) {
    let message;

    if (this.updateForm.get(field)?.errors?.required) {
      message = `El campo ${field} es obligatorio`;
    } else if (this.updateForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 8 caracteres";
    } else if (this.updateForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 32 caracteres";
    } else if( this.updateForm.get(field)?.hasError('pattern')){
      message = "La contraseña debe tener al menos una letra minúscula, al menos una letra mayúscula y al menos un dígito";

    }
    return message;

  }
  getData(){
    this.userDataService.getDataUserByID(this.id).subscribe(res =>{
      console.log(res);
      this.dataToUpdate = res;
      this.RegisterUser = this.dataToUpdate;
    })
  }
  insertData() {
    this.getEmail();
  }
  //load Unit DropDown
  getEmail(){
    this.RegisteruserService.getEmail(this.updateForm.get('email')?.value).subscribe((res: any) => {
    this.email = res;
    this.getCi();
  })

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
          this.RegisteruserService.insertData(this.updateForm.value).subscribe(res => {
          this.showToastSuccess();
          this.updateForm.reset();
        });
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


}
