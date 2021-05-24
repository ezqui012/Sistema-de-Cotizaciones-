import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;
  //private patternName = /^[a-zA-Z-z0-9-zñÑ\u00E0-\u00FC ]*$/

  registerForm = this.fb.group({
    id_item: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(this.patternNumber)]],
    //type: ['Administrativa', [Validators.required]]
  });
  constructor(
    public serviceRequestQuote: RequestQuoteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllItem();
  }
  getAllItem(){
    this.serviceRequestQuote.allItem().subscribe((item)=>{
      this.items = item
    })
  }

  addItemRequest(){
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
}
