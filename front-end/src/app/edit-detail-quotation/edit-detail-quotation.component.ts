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
  selector: 'app-edit-detail-quotation',
  templateUrl: './edit-detail-quotation.component.html',
  styleUrls: ['./edit-detail-quotation.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditDetailQuotationComponent implements OnInit {

  business_name:any;
  statusQuot:any;

  idquotation: number | any;

  enterprises: Enterprise[] | undefined;

  items: ItemRequest[] | any;

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
      field === 'quantity' ? message = `El campo ${fieldSpanish} solo acepta caracteres numéricos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres numéricos y decimales`;
    }else if(this.registerForm.get(field)?.hasError('min')){
      message = `El campo ${fieldSpanish} solo acepta valores mayores a 0`;
    }else if(this.registerForm.get(field)?.hasError('max')){
      message = `El campo ${fieldSpanish} permite el ingreso maximo de 10 digitos y dos decimales`;
    }

    return message;
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

  getQuotInfo(id:any){
    this.service.getInfoQuote(id).subscribe(
      (data) => {
        this.business_name = data[0].business_name;
        this.statusQuot = data[0].status_quotation;
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
        this.showDetailUpdate();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  showDetailUpdate(){
    this.serviceQuote.showDetailQuote(this.route.snapshot.params.idqd).subscribe(
      (data) => {
        this.registerForm.controls['id_enterprise'].setValue(data.id_enterprise);
        this.registerForm.controls['id_item'].setValue(data.id_item);
        this.registerForm.controls['quantity'].setValue(data.quantity);
        this.registerForm.controls['date'].setValue(data.date);
        this.registerForm.controls['delivery_days'].setValue(data.delivery_days);
        this.registerForm.controls['unit_cost'].setValue(data.unit_cost);
        let newDate: moment.Moment = moment.utc(data.date);
        let dateShow: Date = new Date(newDate.format('YYYY-MM-DD'));
        dateShow.setDate(dateShow.getDate() + 1);
        this.dateControl.setValue(dateShow);
        console.log(this.dateControl.value);
      },
      (error) => {
        this.toastr.error(`Error: ${error} Recargue la pagina`);
      }
    );
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

  updateQuote(){
    this.toastr.success('ta bueno');
    console.log(this.dateControl.value);
    let newDate: moment.Moment = moment.utc(this.dateControl.value).local();
    this.registerForm.controls['date'].setValue(newDate.format('YYYY-MM-DD'));
    console.log("fechaaa: " + this.registerForm.get('date')?.value);

  }

}
