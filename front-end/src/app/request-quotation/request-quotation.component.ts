import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateExpenseItem, RequestItem } from '../Model/expenseItem';
import { RequestQuoteService } from '../services/request.service';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { ItemRequest, RegisterRequestResponse, } from '../Model/request';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-request-quotation',
  templateUrl: './request-quotation.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig],
  styleUrls: ['./request-quotation.component.css'],
})
export class RequestQuotationComponent implements OnInit {
  items: Array<DateExpenseItem> = [];
  listItemsRequest: Array<RequestItem> = [];
  listItemsRequestShow: Array<RequestItem> = [];
  idItem: any;
  indexItem: any;
  showEdit: boolean = false;
  showAdd: boolean = true;
  enableSelect = true;
  valueSelectItem:string='';
  idRequest:any;

  //private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  //private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/
  private patternNumber = "^[0-9]+"
  requestForm = this.fb.group({
    id: [localStorage.getItem('quot-umss-usr'), [Validators.required]],
    business_name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100),]],
  });

  registerForm = this.fb.group({
    index: ['', [Validators.required]],
    quantity: ['',[Validators.required, Validators.pattern(this.patternNumber)]],
  });
  constructor(
    public serviceRequestQuote: RequestQuoteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    private titlePage: Title,
    public config: NgbPopoverConfig,

  ) {
    this.titlePage.setTitle('Registrar Solicitud - QUOT-UMSS')
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getAllItem();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getAllItem() {
    this.serviceRequestQuote.allItem().subscribe((item) => {
      this.items = item;
    });
  }

  addItemRequest() {
    if (this.existsIdItem() === false) {
      this.addItem(this.indexItem);
    } else {
      this.toastr.warning('El Ítem ya es parte de la solicitud');
    }
  }
  existsIdItem(): boolean {
    let exists: boolean = false;
    if (this.listItemsRequestShow.length !== 0) {
      for (let i = 0; i < this.listItemsRequestShow.length; i++) {
        if (this.idItem == this.listItemsRequestShow[i].id_item) {
          exists = true;
        }
      }
    }
    return exists;
  }
  addItem(i: number) {
    if (this.registerForm.valid) {
      if (parseInt(this.registerForm.get('quantity')?.value) > 0) {
        let itemRequest: RequestItem = new RequestItem();

        itemRequest.id_item = this.items[i].id_item;
        itemRequest.quantity = this.registerForm.get('quantity')?.value;
        itemRequest.unit_item = this.items[i].unit_item;
        itemRequest.name_item = this.items[i].name_item;
        itemRequest.unit_cost = this.items[i].unit_cost;
        itemRequest.total_cost = this.items[i].unit_cost * itemRequest.quantity;
        itemRequest.index_item = i;

        this.listItemsRequest.push(itemRequest);
        this.getListItemsShow();
      } else {
        this.toastr.error('La cantidad debe ser mayor a "0"');
      }
    }else{
      this.toastr.error('Existen campos incorrectos');
    }
  }
  getListItemsShow() {
    this.listItemsRequestShow = this.listItemsRequest;
  }
  deleteItem(i: number) {
    i !== -1 && this.listItemsRequest.splice(i, 1);
    this.getListItemsShow();
  }

  setIdItem(i: number) {
    this.idItem = this.items[i].id_item;
    this.indexItem = i;
  }
  setIdItemEdit(i: number) {
    this.indexItem = i;
  }
  editItem(i: number) {
    this.showEdit = true;
    this.showAdd = false;
    this.enableSelect = false;
    this.valueSelectItem = this.listItemsRequestShow[i].name_item;
    this.setIdItemEdit(i);
    this.registerForm.controls['index'].setValue(this.listItemsRequest[i].index_item);
    this.registerForm.controls['quantity'].setValue(this.listItemsRequestShow[i].quantity);
    this.getListItemsShow();
  }
  saveChanges() {
    if(parseInt(this.registerForm.get('quantity')?.value) > 0){

      this.showEdit = false;
      this.showAdd = true;
      this.enableSelect = true;

      this.listItemsRequest[this.indexItem].quantity =
        this.registerForm.get('quantity')?.value;
      this.listItemsRequest[this.indexItem].total_cost =
        this.listItemsRequest[this.indexItem].unit_cost *
        this.registerForm.get('quantity')?.value;

      this.getListItemsShow();
    }else{
      this.toastr.error('La cantidad debe ser mayor a "0"')
    }
  }
  //more funtion
  isValidRequestForm() {
    return (
      (this.requestForm.get('business_name')?.touched ||
        this.requestForm.get('business_name')?.dirty) &&
      !this.requestForm.get('business_name')?.valid
    );
  }

  getErrorMessageRequest() {
    let message;
    if (this.requestForm.get('business_name')?.errors?.required) {
      message = 'El campo Razón social es obligatorio';
    } else if (this.requestForm.get('business_name')?.hasError('minlength')) {
      message = 'El campo Razón social requiere como mínimo 10 caracteres';
    } else if (this.requestForm.get('business_name')?.hasError('mmaxlength')) {
      message = 'El campo Razón social requiere como máximo 100 caracteres';
    }
    return message;
  }

  isValidQuantityForm() {
    return (
      (this.registerForm.get('quantity')?.touched ||
        this.registerForm.get('quantity')?.dirty) &&
      !this.registerForm.get('quantity')?.valid
    );
  }

  getErrorMessageQuantity() {
    let message;
    if (this.registerForm.get('quantity')?.errors?.required) {
      message = 'El campo Cantidad es obligatorio';
    } else if (parseInt(this.registerForm.get('quantity')?.value) < 1) {
      message = 'La cantidad debe ser mayor a "0"';
    }
    return message;
  }

  registerRequestQuotation(){
    if(this.requestForm.valid){
      if(this.listItemsRequestShow.length !== 0){
         let res:RegisterRequestResponse;
          this.serviceRequestQuote.registerRequestQuotation(this.requestForm.value).subscribe((data) => {
            res=data;
            if(res.res){
                this.toastr.success("La solicitud de cotización fue registrada con éxito");
                this.registerAllItemsToRequest(res.id);
                this.clearInput();
                this.navigateTo('/request-quotation-list');
              }else{
                this.toastr.error("Ocurrio un error al registrar intente nuevamente");
              }
            },
            (error) => {
              console.log(error);
              this.toastr.error(`Error: ${error} intente nuevamente`);
              this.isValidQuantityForm();
                return;
              }

          );

      }else{
        this.toastr.error("Debe añadir al menos un Ítem en la solicitud de cotización");
      }

    }else{
      this.toastr.error("El campo de Razón Social es incorrecto");
    }
  }

  registerAllItemsToRequest(idResquest:number){

      for(let i=0; i < this.listItemsRequestShow.length; i++){
        let itemRequest:ItemRequest = new ItemRequest;
        itemRequest.id_request = idResquest;
        itemRequest.id_item = this.listItemsRequestShow[i].id_item;
        itemRequest.quantity = this.listItemsRequestShow[i].quantity;
        itemRequest.total_cost = this.listItemsRequestShow[i].total_cost;
        this.serviceRequestQuote.registerItemRequestQuotation(itemRequest).subscribe((data) => {
          if(data.res){
              console.log("El item fue registrado con exito");
            }else{
              this.toastr.error("Ocurrio un error al registrar intente nuevamente");
            }
          },
          (error) => {
            console.log(error);
            this.toastr.error(`Error: ${error} intente nuevamente`);
          }
        );
      }
    }
    clearInput(){
      this.requestForm.get('business_name')?.reset();
      this.registerForm.get('index')?.reset();
      this.registerForm.get('quantity')?.reset();
    }

}
