import { CompanyService } from './../services/company.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title,
    private formBuilder: FormBuilder,
    private companyDataService: CompanyService
  ){
    this.titlePage.setTitle('Registro de Empresas - QUOT-UMSS');

   }
   enterpriseForm= this.formBuilder.group({
    name_enterprise: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
    sector_enterprise: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(10)]],
    nit_enterprise: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(1),
                          Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    legal_representative: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(10)]],
    phone_enterprise: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7), Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    address_enterprise: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]]
   })
   isValid(field:string){
    return ( this.enterpriseForm.get(field)?.touched || this.enterpriseForm.get(field)?.dirty) && !this.enterpriseForm.get(field)?.valid;
   }
   getErrorMessageEnterprise(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Nombre de la Empresa es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 10 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 50 caracteres";
    }
    return message;
  }
  getErrorMessageLR(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Nombre del Representante Legal es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 10 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 50 caracteres";
    }
    return message;
  }
  getErrorMessageSE(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Rubro de la Empresa es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 10 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 30 caracteres";
    }
    return message;
  }
  getErrorMessageNit(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo NIT es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 10 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 50 caracteres";
    }
    return message;
  }
  getErrorMessagePhone(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Teléfono es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 7 dígitos";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 8 dígitos";
    }
    return message;
  }
  getErrorMessageAddress(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Dirección es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 10 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 100 caracteres";
    }
    return message;
  }
  showToastSuccess(){
    this.toastr.success('Se registró la empresa exitosamente');
  }

  registerEnterprise(){
    console.log(this.enterpriseForm.value);
    this.companyDataService.insertData(this.enterpriseForm.value).subscribe(res=>{
      this.showToastSuccess();
    })
  }
  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }


}
