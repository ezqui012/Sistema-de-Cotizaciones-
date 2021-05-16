import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteFormComponent implements OnInit {

  business_name:string = 'Actualizacion de monitores del laboratorio';
  statusQuot:string = 'Proceso';

  options: string[] = ['Tigo', 'Muebles rr', 'Mundo Tecno', 'Viva', 'Pollos de la case'];

  items: string[] = ['Monitores', 'Sillas'];

  dateControl = new FormControl(Validators.required);
  dateErrorMessage:string = 'El campo Fecha es de caracter obligatorio';

  private patternNumber = '^[0-9]+';
  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  registerForm = this.fb.group({
    id_enterprise: ['', [Validators.required]],
    id_item: ['', [Validators.required]],
    id_quotation: [1, [Validators.required]],
    quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternNumber)]],
    unit_cost: ['', [Validators.required, Validators.min(1), Validators.max(9999999999.99), Validators.pattern(this.patternDecimal)]],
    date:['', [Validators.required]],
    delivery_days: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternNumber)]]
  });

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router:Router,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Formulario de cotización - QUOT-UMSS');
  }

  ngOnInit(): void {
  }

  isValid(field:string){
    return ( this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && !this.registerForm.get(field)?.valid;
  }

  isValidDate(){
    return ( this.dateControl?.touched || this.dateControl?.dirty) && !this.dateControl?.valid;
  }

  getErrorMessage(field: string){
    let message;
    let fieldSpanish = this.translate(field);

    if(this.registerForm.get(field)?.errors?.required){
      message = `El campo ${fieldSpanish} es obligatorio`;
    }else if(this.registerForm.get(field)?.hasError('pattern')){
      field === 'quantity' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y decimales`;
    }else if(this.registerForm.get(field)?.hasError('min')){
      message = `El campo ${fieldSpanish} solo acepta valores mayores a 0`;
    }else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos y dos decimales`;
    }

    return message;
  }

  showValue(){
    if(this.dateControl.invalid){
      this.toastr.error('Existen campos incorrectos');
      return;
    }

    let newDate: moment.Moment = moment.utc(this.dateControl.value).local();
    this.registerForm.controls['date'].setValue(newDate.format('YYYY-MM-DD'));

    if(this.registerForm.invalid ){
      this.toastr.error('Existen campos incorrectos');
      return;
    }

    console.log(this.registerForm.value);
  }

  private translate(field: string):string|void{
    if(field === 'id_enterprise'){
      return 'Empresa';
    } else if(field === 'id_item'){
      return 'Item';
    } else if(field === 'quantity'){
      return 'Cantidad'
    }else if(field === 'date'){
      return 'Fecha';
    }else if(field === 'delivery_days'){
      return 'Dias';
    }else if('unit_cost'){
      return 'Costo Unitario';
    }
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

}
