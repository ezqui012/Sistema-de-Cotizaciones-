import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ItemsService } from '../services/items.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BinnacleService } from '../services/binnacle.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ItemEditComponent implements OnInit {

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

  oldData: any;

  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  itemRegisterForm = this.fb.group({
    name_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
    type_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    unit_item: ['', [Validators.required, Validators.maxLength(10)]],
    description_item: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    subtype_item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title,
    private service: ItemsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serbiceB: BinnacleService
  ) {
    this.titlePage.setTitle('Editar Item - QUOT-UMSS');
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.loadTypeItems();
    this.loadUnitItems();
    this.loadInfoItem();
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
  }

  loadInfoItem(){
    this.service.getInfoItem(this.route.snapshot.params.id).subscribe(
      (data) => {
        this.oldData = JSON.stringify(data);
        this.itemRegisterForm.controls['name_item'].setValue(data.name_item);
        this.itemRegisterForm.controls['type_item'].setValue(data.type_item);
        this.itemRegisterForm.controls['unit_item'].setValue(data.unit_item);
        this.itemRegisterForm.controls['description_item'].setValue(data.description_item);
        this.itemRegisterForm.controls['subtype_item'].setValue(data.subtype_item);
        this.getSubType();
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.navigateTo('/item-list');
        this.toastr.error(`ERROR: ${error} Intente de nuevo`);
      }
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

  updateItem(){
    if(this.itemRegisterForm.invalid){
      this.toastr.error('Existem campos incorrectos');
      return;
    }

    this.spinner.show(this.spinnerName);

    this.service.updateItem(this.route.snapshot.params.id, this.itemRegisterForm.value).subscribe(
      (data) => {
        if(data.res){
          let binData = {
            table_name: 'expense_item',
            action: 'Edición',
            new_data: JSON.stringify(this.itemRegisterForm.value),
            old_data: this.oldData
          };
          this.serbiceB.storeBinnacle(binData).subscribe();
          this.spinner.hide(this.spinnerName);
          this.navigateTo('/item-list');
          this.toastr.success('Los cambios fueron realizados con éxito');
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error('El nombre de item ingresado ya se encuentra en uso, ingrese otro.');
      }
    );
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
