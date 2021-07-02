import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ItemsService } from '../services/items.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BinnacleService } from '../services/binnacle.service';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ItemRegisterComponent implements OnInit {

  options: string[] = ['Sin tipo'];
  filteredOptions: Observable<string[]> | undefined;
  optionsS: string[] = ['Sin tipo'];
  filteredOptionsS: Observable<string[]> | undefined;

  typeUnit: string[] = ['Sin unidad'];

  filteredUnit: Observable<string[]> | undefined;

  indexType: number = 0;
  indexUnit: number = 0;

  spinnerType: string | any;
  spinnerName: string | any;

  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  itemRegisterForm = this.fb.group({
    name_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
    type_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    unit_item: ['', [Validators.required, Validators.maxLength(10)]],
    unit_cost: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternDecimal)]],
    description_item: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    subtype_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title,
    private service: ItemsService,
    private spinner: NgxSpinnerService,
    private serbiceB: BinnacleService
  ) {
    this.titlePage.setTitle('Registro de Items - QUOT-UMSS');
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.loadTypeItems();
    this.loadUnitItems();
  }

  loadTypeItems(){
    this.service.getAllTypesItems().subscribe(
      (data) => {
        let i:number = 0;
        for(let value of data){
          this.options[i] = value.type_item;
          i++;
        }
        this.filteredOptions = this.itemRegisterForm.controls['type_item'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterType(value))
        );
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
  }

  loadUnitItems(){
    this.service.getAllUnitsItems().subscribe(
      (data) => {
        let i:number = 0;
        for(let value of data){
          this.typeUnit[i] = value.unit_item;
          i++;
        }
        this.filteredUnit = this.itemRegisterForm.controls['unit_item'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterUnit(value))
        );
      },
      (error) => {
        this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
    this.spinner.hide(this.spinnerName);
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
    this.spinner.show(this.spinnerName);
    this.service.insertItem(this.itemRegisterForm.value).subscribe(
      (data) => {
        if(data.res){
          let binData = {
          table_name: 'expense_item',
          action: 'Creación',
          new_data: JSON.stringify(this.itemRegisterForm.value)
          };
          this.serbiceB.storeBinnacle(binData).subscribe();
          this.toastr.success('El registro del ítem se realizo con éxito');
          this.loadTypeItems();
          this.loadUnitItems();
          this.clearInputs();
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        try {
          if(error.error.errors.name_item[0]){
            this.toastr.error(error.error.errors.name_item[0]);
          }
        } catch (error) {
          this.toastr.error(`ERROR: ${error} Recargue la pagina`);
        }
      }
    );
  }

  private clearInputs(){
    this.itemRegisterForm.get('name_item')?.reset();
    this.itemRegisterForm.get('unit_cost')?.reset();
    this.itemRegisterForm.get('description_item')?.reset();
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

  getSubType(){
    this.optionsS = [];
    if(this.itemRegisterForm.get('type_item')?.value === ''){
      return;
    }
    this.service.getSubTypesItems(this.itemRegisterForm.get('type_item')?.value).subscribe(
      (data) => {
        let i:number = 0;
        for(let value of data){
          this.optionsS[i] = value.subtype_item;
          i++;
        }
        this.filteredOptionsS = this.itemRegisterForm.controls['subtype_item'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterSubType(value))
        );
      },
      (error) => {
        //this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
  }

  private _filterSubType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsS.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
