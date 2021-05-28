import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateExpenseItem, RequestItem } from '../Model/expenseItem';
import { RequestQuoteService } from '../services/request.service';

@Component({
  selector: 'app-request-quotation',
  templateUrl: './request-quotation.component.html',
  styleUrls: ['./request-quotation.component.css']
})
export class RequestQuotationComponent implements OnInit {
   items:Array<DateExpenseItem> = []
   //itemRequest: RequestItem = new RequestItem;
   listItemsRequest: Array<RequestItem>=[]
   listItemsRequestShow: Array<RequestItem>=[]
   idItem:any
   idItemEdit:any
   showEdit:boolean = false
   showAdd:boolean = true
   private patternNumber = /^[1-9]+(\.?[1-9]+)?$/;
  //private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/
  //private patternNumber = "^[1-9]+"
  requestForm = this.fb.group({
    id: ['3', [Validators.required]],
    business_name: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(100)]],
  });

  registerForm = this.fb.group({
    id_item: ['', [Validators.required]],
    quantity: ['', [Validators.required,Validators.pattern(this.patternNumber)]],
  });
  constructor(
    public serviceRequestQuote: RequestQuoteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.getAllItem();
  }

  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getAllItem(){
    this.serviceRequestQuote.allItem().subscribe((item)=>{
      this.items = item
    })
  }

  addItemRequest(){
  //   //if(this.idItem == )
   this.addItem(this.idItem)
   }
  addItem(i:number){
   let itemRequest: RequestItem = new RequestItem;
  itemRequest.id_item = this.items[i].id_item;
  itemRequest.quantity = this.registerForm.get('quantity')?.value
  itemRequest.unit_item = this.items[i].unit_item;
  itemRequest.name_item = this.items[i].name_item;
  itemRequest.unit_cost = this.items[i].unit_cost;
  itemRequest.total_cost = (this.items[i].unit_cost*itemRequest.quantity);
  itemRequest.index_item = i;

  this.listItemsRequest.push(itemRequest);
  this.getListItemsShow();
  }
  getListItemsShow(){
    this.listItemsRequestShow = this.listItemsRequest;
  }
  deleteItem(i:number){
    i !== -1 && this.listItemsRequest.splice( i, 1 );
    this.getListItemsShow();
  }

  setIdItem(idItem:number){
    this.idItem=idItem;
  }
  setIdItemEdit(idItem:number){
    this.idItemEdit=idItem;
  }
  editItem(i:number){
    this.showEdit=true
    this.showAdd=false
    this.setIdItemEdit(i);
    this.registerForm.controls['id_item'].setValue(this.listItemsRequest[i].index_item);
    this.registerForm.controls['quantity'].setValue(this.listItemsRequest[i].quantity);
    this.getListItemsShow();

  }
  saveChanges(){
    this.showEdit=false
    this.showAdd=true


    this.listItemsRequest[this.idItemEdit].quantity=this.registerForm.get('quantity')?.value
    this.listItemsRequest[this.idItemEdit].total_cost = (this.listItemsRequest[this.idItemEdit].unit_cost*this.registerForm.get('quantity')?.value);

    this.getListItemsShow();

  }
  //more funtion
  isValidRequestForm(){
    return ( this.requestForm.get('business_name')?.touched || this.requestForm.get('business_name')?.dirty) && !this.requestForm.get('business_name')?.valid;
  }

  getErrorMessageRequest(){
    let message;
    if(this.requestForm.get('business_name')?.errors?.required){
      message = "El campo Razon social es obligatorio";
    }else if(this.requestForm.get('business_name')?.hasError('minlength')){
      message = "El campo Razon social requiere como mínimo 10 caracteres";
    }else if(this.requestForm.get('business_name')?.hasError('mmaxlength')){
      message = "El campo Razon social requiere como maximo 100 caracteres";
    }
    return message;
  }

  isValidQuantityForm(){
    return ( this.registerForm.get('quantity')?.touched || this.registerForm.get('quantity')?.dirty) && !this.registerForm.get('quantity')?.valid;
  }

  getErrorMessageQuantity(){
    let message;
    if(this.registerForm.get('quantity')?.errors?.required){
      message = "El campo Cantidad es obligatorio";
    }else if(parseInt(this.registerForm.get('quantity')?.value) < 1){
      message = 'La cantidad debe ser mayor a "0"';
    }// }else if(this.requestForm.get('quantity')?.hasError('mmaxlength')){
    //   message = "El campo Razon social requiere como maximo 100 caracteres";
    // }
    return message;
  }
}
