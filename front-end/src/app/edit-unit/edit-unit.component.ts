import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Faculty } from '../Model/faculty';
import { FacultyService } from '../services/faculty.service';
import { UnitService } from '../services/unit.service';
import { RegisterUnitResponse } from '../Model/unit';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ListUnit } from '../Model/list';
import { ListService } from '../services/list.service';
@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class EditUnitComponent implements OnInit {


  faculties: Faculty[] | undefined;
  showAmount:boolean=false;
  messageFail = false;
  messageRegisterFailed = '';
  id:any = '';
  actualAmount:any

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/
  public unit: any;
  registerForm = this.fb.group({
    id_faculty: ['', [Validators.required]],
    name_unit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
    type: ['Administrativa', [Validators.required]]
  });

  constructor(
    //private service: FacultyService,
    private fb: FormBuilder,
    private serviceUnitSelect: ListService,
    private serviceUnit: UnitService,
    private serviceFaculty: FacultyService,
    public toastr: ToastrService,
    private router:Router,
    private route: ActivatedRoute,
    private titlePage: Title
    ) {
      this.titlePage.setTitle('Registro de unidades - QUOT-UMSS');
    }

  ngOnInit(): void {
    this.getFaculty();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("recupere el id: "+this.id);
   // var unidad:ListUnit =
   this.getUnit(this.id);
    //console.log(this.unit);
  }

  getUnit(id:any){
    this.serviceUnitSelect.getUnitSelect(id).subscribe((data) => {
      console.log(data);

      this.unit = data;

      /*this.registerForm.controls['id_faculty'].setValue(this.unit.id_faculty);
      this.registerForm.controls['name_unit'].setValue(this.unit.name_unit);
      this.registerForm.controls['type'].setValue(this.unit.type);

      if(this.unit.type === 'Gasto'){
        this.actualAmount = this.unit.amount;
        this.showAmount = true;
        this.showInputAmout(true);
        this.registerForm.controls['amount'].setValue(this.unit.amount);
      }*/

      this.setUnitData();


      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  getFaculty(){
    this.serviceFaculty.allFaculties().subscribe((data) => {
        this.faculties = data;
      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
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
      field === 'name_unit' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y alfabéticos`
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

  setUnitData(){
      this.registerForm.controls['id_faculty'].setValue(this.unit.id_faculty);
      this.registerForm.controls['name_unit'].setValue(this.unit.name_unit);
      this.registerForm.controls['type'].setValue(this.unit.type);

      if(this.unit.type === 'Gasto'){
        this.actualAmount = this.unit.amount;
        this.showAmount = true;
        this.showInputAmout(true);
        this.registerForm.controls['amount'].setValue(this.unit.amount);
      }
  }

  showInputAmout(show:boolean){
    this.showAmount =show;
    this.registerForm.get('amount')?.reset;
    if(this.showAmount){
      this.registerForm = this.fb.group({ //'this.registerForm.get('id_faculty')?.value'
        id_faculty: [this.registerForm.get('id_faculty')?.value, [Validators.required]],
        name_unit: [this.registerForm.get('name_unit')?.value, [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
        type: ['Gasto', [Validators.required]],
        amount: [this.actualAmount, [Validators.required, Validators.max(9999999999.99), Validators.pattern(this.patternNumber)]]
      });
    }else{
      this.registerForm = this.fb.group({
        id_faculty: [this.registerForm.get('id_faculty')?.value, [Validators.required]],
        name_unit: [this.registerForm.get('name_unit')?.value, [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern(this.patternName)]],
        type: ['Administrativa', [Validators.required]]
      });
    }
  }

  updateUnit(){
    if(this.registerForm.invalid){
      this.messageFail = true;
      this.messageRegisterFailed = 'Existen campos incorrectos';
      return;
    }
    let res: RegisterUnitResponse;
    this.serviceUnitSelect.updateUnitSelect(this.id, this.registerForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          this.toastr.success('Se guardaron los cambios con éxito');
          this.clearInput();
        }else{
          this.toastr.warning('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        this.toastr.error('El nombre de la Unidad ya se encuentra registrado');
      }
    );
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
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
}

