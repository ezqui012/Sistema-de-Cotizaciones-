import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EnterpriseService } from '../services/enterprise.service';
import { Enterprise } from '../Model/enterprise';
import { ItemRequest } from '../Model/expense-item';
import { QuoteDetailService } from '../services/quote-detail.service';
import { QuotationService } from '../services/quotation.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class QuoteFormComponent implements OnInit {

  business_name:any;
  statusQuot:any;

  private numbQT: number = 0;
  private lenght: number = 0;

  idquotation: number | any;

  enterprises: Enterprise[] | undefined;

  items: ItemRequest[] | any;

  finish: boolean = false;

  dateControl = new FormControl(Validators.required);
  dateErrorMessage:string = 'El campo Fecha es de caracter obligatorio';

  private patternNumber = '^[0-9]+';
  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  registerForm = this.fb.group({
    id_enterprise: ['', [Validators.required]],
    id_item: ['', [Validators.required]],
    id_quotation: [this.route.snapshot.params.id, [Validators.required]],
    quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternNumber)]],
    unit_cost: ['', [Validators.required, Validators.min(1), Validators.max(9999999999.99), Validators.pattern(this.patternDecimal)]],
    date:['', [Validators.required]],
    delivery_days: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternNumber)]]
  });

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router:Router,
    private titlePage: Title,
    private service: EnterpriseService,
    private route: ActivatedRoute,
    private serviceQuote: QuoteDetailService,
    private serviceQ: QuotationService
  ) {
    this.titlePage.setTitle('Formulario de cotización - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.idquotation = this.route.snapshot.params.id;
    this.getEnterprises();
    this.getItemsRequest(this.route.snapshot.params.id);
    this.getQuotInfo(this.route.snapshot.params.id);
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
      field === 'quantity' || field === 'delivery_days' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y decimales`;
    }else if(this.registerForm.get(field)?.hasError('min')){
      message = `El campo ${fieldSpanish} solo acepta valores mayores a 0`;
    }else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos y dos decimales`;
    }

    return message;
  }

  registerQuote(){
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

    let res: any
    this.serviceQuote.insertQuote(this.registerForm.value).subscribe(
      (data) => {
        res = data;
        if(res.res){
          this.toastr.success('Se registro la cotizacion con exito');
          this.finishQuote();
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un problema, intente nuevamente');
      }
    );
  }

  getEnterprises(){
    this.service.allEnterprise().subscribe(
      (data) => {
        this.enterprises = data;
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  getItemsRequest(id:any){
    this.service.getItems(id).subscribe(
      (data) => {
        this.items = data;
        this.finishQuote();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  async finishQuote(){
    this.numbQT = 0;
    this.lenght = 0;
    for await(let option of this.items){
      this.lenght = this.lenght + 1;
      this.serviceQ.getNumberQuotesItem(this.route.snapshot.params.id, option.id_item).subscribe(
        (data) => {
          if(data.total >= 3){
            this.numbQT = this.numbQT + 1;
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(`Ocurrio un error: ${error} recargue la pagina`);
          this.finish =false;
        }
      );
    }
  }

  endQuote(){
    (this.numbQT === this.lenght && this.numbQT > 0) ? this.finish=true : this.finish=false;
    if(this.finish){
      let newStatus: any = {
        status_quotation: 'Finalizado'
      };
      this.serviceQ.changeStatusQuotation(this.idquotation, newStatus).subscribe(
        (data: any) => {
          if(data.res){
            this.navigateTo('/quote-list');
            this.toastr.success(`Las cotizaciones para la solicitud ${this.business_name}, se mandaron al encargado para su revisión`);
          }
        }, (error:any) => {
          this.toastr.error(error);
        }
      );
    }else{
      this.toastr.error('Se necesita como mínimo registrar 3 cotizaciones por cada ítem solicitado');
    }
  }

  getQuotInfo(id:any){
    this.service.getInfoQuote(id).subscribe(
      (data) => {
        if(data[0].status_quotation === 'Proceso'){
          this.business_name = data[0].business_name;
          this.statusQuot = data[0].status_quotation;
        }else{
          this.navigateTo('/quote-list');
          this.toastr.info('Solo las cotizaciones que se encuentran en estado de Proceso son editables');
        }
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  showQuantity(){
    for(let data of this.items){
      if(data.id_item === this.registerForm.get('id_item')?.value){
        this.registerForm.controls['quantity'].setValue(data.quantity);
      }
    }
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
