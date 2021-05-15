import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FacultyService } from '../services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { ResponseRegister } from '../Model/faculty';

@Component({
  selector: 'app-school-edit',
  encapsulation:ViewEncapsulation.Emulated,
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})
export class SchoolEditComponent implements OnInit {

  private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/;
  private patternNumber = '^[0-9]+';
  private patternEmail = /\S+@\S+\.\S+/;
  private patternNameDean = /^[a-zA-Z-zñÑ\u00E0-\u00FC ]*$/;

  public dataFaculty: any

  facultyRegisterForm = this.fb.group({
    name_faculty: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(this.patternName)]],
    phone_faculty: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(this.patternNumber)]],
    email_faculty: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(this.patternEmail)]],
    address_faculty: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
    dean_faculty: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(this.patternNameDean)]]
  });

  messageFail = false;
  messageRegisterFailed = '';

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service: FacultyService,
    public toastr: ToastrService,
    private titlePage: Title,
    private route: ActivatedRoute
    ) {
      this.titlePage.setTitle('Editar facultad - QUOT-UMSS');
     }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.infoFaculty(this.route.snapshot.params.id);
  }

  infoFaculty(id: any){
    this.service.getInfoFaculty(id).subscribe(
      (data) => {
        this.dataFaculty = data;
        this.loadValuesForm();
      },
      (error) => {
        this.toastr.error(`Falla en la conexion ${error}`);
        this.navigateTo('/school-list');
      }
    );
  }

  loadValuesForm(){
    this.facultyRegisterForm.controls['name_faculty'].setValue(this.dataFaculty.name_faculty);
    this.facultyRegisterForm.controls['phone_faculty'].setValue(this.dataFaculty.phone_faculty);
    this.facultyRegisterForm.controls['email_faculty'].setValue(this.dataFaculty.email_faculty);
    this.facultyRegisterForm.controls['address_faculty'].setValue(this.dataFaculty.address_faculty);
    this.facultyRegisterForm.controls['dean_faculty'].setValue(this.dataFaculty.dean_faculty);
  }

  isValid(field:string){
    return ( this.facultyRegisterForm.get(field)?.touched || this.facultyRegisterForm.get(field)?.dirty) && !this.facultyRegisterForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.facultyRegisterForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.facultyRegisterForm.get(field)?.hasError('pattern')){
      (field === 'name_faculty' || field === 'address_faculty') ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y alfabéticos`
      : field === 'phone_faculty' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos` :
      field === 'email_faculty' ? message = `El campo ${fieldSpanish} solo acepta correos electronicos` :
      message = `El campo ${fieldSpanish} solo acepta caracteres alfabéticos`;
    } else if(this.facultyRegisterForm.get(field)?.hasError('minlength')){
      const minLength = this.facultyRegisterForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} requiere como mínimo el ingreso de ${minLength} caracteres`;
    } else if(this.facultyRegisterForm.get(field)?.hasError('maxlength')){
      const maxLength = this.facultyRegisterForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} permite el ingreso de ${maxLength} caracteres como máximo`;
    }

    return message;
  }

  editFaculty(){
    if(this.facultyRegisterForm.invalid){
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: ResponseRegister;
    this.service.updateFaculty(this.route.snapshot.params.id, this.facultyRegisterForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          this.toastr.success('Se guardaron los cambios con éxito');
          this.navigateTo('/school-list')
        }else{
          this.toastr.warning('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        this.toastr.error('El nombre de la facultad ya se encuentra registrado');
      }
    );
  }

  onKeyPress(){
    if(this.messageFail && !this.facultyRegisterForm.invalid && this.messageRegisterFailed == 'Existen campos incorrectos'){
      this.messageFail = false;
    }else if(this.messageFail){
      this.messageFail = false;
    }
  }

  private translate(field: string): string|void{
    if(field === 'name_faculty'){
      return 'Nombre de facultad';
    }else if(field === 'phone_faculty'){
      return 'Teléfono de la facultad';
    }else if(field === 'email_faculty'){
      return 'Correo de la facultad';
    }else if(field === 'address_faculty'){
      return 'Dirección de la facultad';
    }else if(field === 'dean_faculty'){
      return 'Decano de la facultad';
    }
  }

}
