import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ItemRegisterComponent implements OnInit {

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  typeUnit: string[] = ['Cant', 'Cm', 'Ltrs'];
  filteredUnit: Observable<string[]> | undefined;

  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  itemRegisterForm = this.fb.group({
    name_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
    type_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    unit_item: ['', [Validators.required, Validators.maxLength(10)]],
    unit_cost: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternDecimal)]],
    description_item: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Registro de Items - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.filteredOptions = this.itemRegisterForm.controls['type_item'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterType(value))
    );
    this.filteredUnit = this.itemRegisterForm.controls['unit_item'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterUnit(value))
    );
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterUnit(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.typeUnit.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  isValid(field:string){
    return ( this.itemRegisterForm.get(field)?.touched || this.itemRegisterForm.get(field)?.dirty) && !this.itemRegisterForm.get(field)?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.itemRegisterForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.itemRegisterForm.get(field)?.hasError('pattern')){
      message = `El campo ${fieldSpanish} debe ser numérico`;
    }else if(this.itemRegisterForm.get(field)?.hasError('minlength')){
      const minLength = this.itemRegisterForm.get(field)?.errors?.minlength.requiredLength;
      message = `El campo ${fieldSpanish} debe tener un  mínimo de ${minLength} caracteres`;
    }else if(this.itemRegisterForm.get(field)?.hasError('maxlength')){
      const maxLength = this.itemRegisterForm.get(field)?.errors?.maxlength.requiredLength;
      message = `El campo ${fieldSpanish} debe tener un  máximo  de ${maxLength} caracteres`;
    }else if(this.itemRegisterForm.get(field)?.hasError('min')){
      message = `El campo ${fieldSpanish} debe ser mayor a "0"`;
    }

    return message;
  }

  registerItem(){
    if(this.itemRegisterForm.invalid){
      this.toastr.error('Existem campos incorrectos');
      return;
    }
    console.log(this.itemRegisterForm.value);
  }

  private translate(field: string): string|void{
    if(field === 'name_item'){
      return 'Nombre de ítem';
    }else if(field === 'type_item'){
      return 'Tipo de ítem';
    }else if(field === 'unit_item'){
      return 'Unidad';
    }else if(field === 'unit_cost'){
      return 'Costo unitario';
    }else if(field === 'description_item'){
      return 'Descripción';
    }
  }

}
