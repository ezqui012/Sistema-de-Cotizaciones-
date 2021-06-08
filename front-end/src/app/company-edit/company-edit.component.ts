import { Company } from './../Model/company';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  options: string[] =['Sin sector'];
  filteredOptions: Observable<string[]> | undefined;
  public id = this.route.snapshot.params.id;
  dataToUpdate:any;
  dataCompany= new Company();
  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title,
    private companyDataService: CompanyService,
    private route : ActivatedRoute
  ) {
    this.titlePage.setTitle('Edición de Empresas - QUOT-UMSS');

  }
  enterpriseForm= this.fb.group({
    name_enterprise: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
    sector_enterprise: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(4)]],
    nit_enterprise: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(1),
                          Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    legal_representative: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]],
    phone_enterprise: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7), Validators.pattern('^-?[0-9 ]\\d*(\\.\\d{1,2})?$')]],
    address_enterprise: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]],
    email_enterprise: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(8), Validators.pattern(/\S+@\S+\.\S+/)]]
  })
   isValid(field:string){
    return ( this.enterpriseForm.get(field)?.touched || this.enterpriseForm.get(field)?.dirty) && !this.enterpriseForm.get(field)?.valid;
   }
   getErrorMessageEnterprise(field: string) {
    let message;
    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo Nombre de la Empresa es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 5 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 100 caracteres";
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
      message = "Mínimo 4 caracteres";
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
      message = "Máximo de 15 caracteres";
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
  getErrorMessageEmail(field: string) {
    let message;

    if (this.enterpriseForm.get(field)?.errors?.required) {
      message = `El campo correo es obligatorio`;
    } else if (this.enterpriseForm.get(field)?.hasError('minlength')) {
      message = "Ingrese minimo 8 caracteres";
    } else if (this.enterpriseForm.get(field)?.hasError('maxlength')) {
      message = "Ingrese maximo 100 caracteres";
    }  else if (this.enterpriseForm.get(field)?.hasError('pattern')) {
      message = "Ingrese un correo valido, ejemplo: Carlos@gmail.com";
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
      this.loadSectors();
    })
  }
  loadSectors(){
    this.companyDataService.getAllSectors().subscribe(
      (data) => {

        let i:number = 0;
        for(let value of data){
          this.options[i] = value.sector_enterprise;
          i++;
        }

        this.filteredOptions = this.enterpriseForm.controls['sector_enterprise'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterSector(value))
        );
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
  }
  private _filterSector(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getDataEnterprise(){
    this.companyDataService.getDataEnterpriseByID(this.id).subscribe(res=>{
      this.dataToUpdate=res;
      this.dataCompany=this.dataToUpdate[0]
      console.log(this.dataCompany.name_enterprise)
      this.enterpriseForm.controls['name_enterprise'].setValue(this.dataCompany.name_enterprise);
      this.enterpriseForm.controls['sector_enterprise'].setValue(this.dataCompany.sector_enterprise);
      this.enterpriseForm.controls['nit_enterprise'].setValue(this.dataCompany.nit_enterprise);
      this.enterpriseForm.controls['legal_representative'].setValue(this.dataCompany.legal_representative);
      this.enterpriseForm.controls['phone_enterprise'].setValue(this.dataCompany.phone_enterprise);
      this.enterpriseForm.controls['email_enterprise'].setValue(this.dataCompany.email_enterprise);
      this.enterpriseForm.controls['address_enterprise'].setValue(this.dataCompany.address_enterprise);

    })
  }
  updateEnterprise(){

    if(this.enterpriseForm.invalid){
      return
    }
    this.companyDataService.update(this.id, this.enterpriseForm.value).subscribe(res=>{
      this.showToastSuccess();
    },
    (error: any)=>{
       let message= error;
       this.repitData(message);
    })
  }
  repitData(message: any) {
    try {
      if (message.error.errors.nit_enterprise[0] && message.error.errors.name_enterprise[0] && message.error.errors.email_enterprise[0]) {
        this.toastr.error(message.error.errors.nit_enterprise[0]);
        this.toastr.error(message.error.errors.name_enterprise[0]);
        this.toastr.error(message.error.errors.email_enterprise[0]);
      }
    } catch (error) {
      try {
        if (message.error.errors.nit_enterprise[0] && message.error.errors.name_enterprise[0]) {
          this.toastr.error(message.error.errors.nit_enterprise[0]);
          this.toastr.error(message.error.errors.name_enterprise[0]);
        }

      } catch (error) {
        try {
          if (message.error.errors.nit_enterprise[0] && message.error.errors.email_enterprise[0]) {
            this.toastr.error(message.error.errors.nit_enterprise[0]);
            this.toastr.error(message.error.errors.email_enterprise[0]);
          }
        } catch (error) {
          try {
            if (message.error.errors.name_enterprise[0] && message.error.errors.email_enterprise[0]) {
              this.toastr.error(message.error.errors.name_enterprise[0]);
              this.toastr.error(message.error.errors.email_enterprise[0]);
            }
          } catch (error) {
            try {
              this.allMesagges(message);
            } catch (error) {

            }
          }

        }

      }
    }
  }
  allMesagges(message: any) {
    try {
      if (message.error.errors.nit_enterprise[0]) {
        this.toastr.error(message.error.errors.nit_enterprise[0]);
      }

    } catch (error) {
      try {
        if (message.error.errors.name_enterprise[0]) {
          this.toastr.error(message.error.errors.name_enterprise[0]);

        }
      } catch (error) {
        if (message.error.errors.email_enterprise[0]) {
          this.toastr.error(message.error.errors.email_enterprise[0]);
        }
      }

    }
  }





  ngOnInit(): void {
    this.loadSectors();
    this.getDataEnterprise();
  }
  navigateTo(path: String){
    console.log(path)
    this.router.navigate([path]);
  }
}
