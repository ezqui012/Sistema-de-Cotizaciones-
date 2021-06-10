import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ExpenseItems } from '../Model/expenseItem';
import { ItemQuoteAcepted, ItemQuotes, ResponseQuote, SelectControlItem } from '../Model/quoteModel';
import { DetailRequestService } from '../services/detail-request.service';
import { QuoteService } from '../services/quote.service';


@Component({
  selector: 'app-comparative-quotes',
  templateUrl: './comparative-quotes.component.html',
  encapsulation:ViewEncapsulation.Emulated,
  styleUrls: ['./comparative-quotes.component.css']
})
export class ComparativeQuotesComponent implements OnInit {
  //indexSelect:boolean =true;
  //isSelect:any
  //selectItem:boolean =false
  id:any
  idQuote:any
  entrusted:any
  idItem:any
  idDq:any
  pos:any
  items:Array<ExpenseItems>=[]
  itemsQuotes:Array<ItemQuotes>=[]
  itemsSelect:Array<SelectControlItem>=[]
  //register:ItemQuoteAcepted = new ItemQuoteAcepted
  //itemSelected:SelectControlItem = new SelectControlItem
  showBtn:boolean=true
  totalCost: number = 0;

  actualAmount: number | any;
  rejectedForm = this.fb.group({
    id_request: [ this.route.snapshot.paramMap.get('idR'), [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10)]],
    id: [localStorage.getItem('quot-umss-usr'), [Validators.required]]
  });

  constructor(
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public serviceQuote: QuoteService,
    public toastr: ToastrService,
    private service: DetailRequestService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idR');
    this.idQuote = this.route.snapshot.paramMap.get('idQ');
    this.entrusted = this.route.snapshot.paramMap.get('entrusted');
    this.getItems(this.id);

    this.getAmount();
  }
  openModal(content: any, idDq:number, pos:number, info:boolean):void{
    this.idDq = idDq;
    this.pos = pos;
    this.modal.open(content,{ windowClass:"colorModal"});

  }
  openModalRejected(content: any):void{
    // this.idDq = idDq;
    // this.pos = pos;
    this.modal.open(content,{ windowClass:"colorModal"});

  }
  navigateTo(path: String) {
    this.router.navigate([path]);
  }
  getItems(idRequest:any){
    this.serviceQuote.getItemsRequest(idRequest).subscribe((item)=> {
      this.items = item

    })
  }

  showItems(idItem:any){
    //console.log("llega el id: "+idItem)
    //console.log(this.idQuote)
    this.idItem = idItem;
    this.serviceQuote.getItemsQuotes(this.idQuote, idItem).subscribe((data)=> {
      this.itemsQuotes = data

    })
    this.checkItemSelect();
  }

  elegirItem(totalCost:number){
    const itemSelected:SelectControlItem = new SelectControlItem

    itemSelected.id_qd = this.idDq
    itemSelected.id_item = this.idItem
    itemSelected.elected = true;
    this.itemsSelect.push(itemSelected)
    this.showBtn=false
    this.modal.dismissAll()
    console.log(this.itemsSelect)
    this.totalCost=this.totalCost+totalCost;
  }
  checkItemSelect(){
    if(this.itemsSelect.length === 0){
      this.showBtn = true
    }else{
      for (let i=0; i<this.itemsSelect.length; i++){
        if(this.itemsSelect[i].id_item === this.idItem){
          this.showBtn = false;
          break;
        }else{
          this.showBtn =true

        }

      }
    }
  }
  registerQuoteAccepted(){
    if(this.items.length === this.itemsSelect.length && this.items.length !== 0){
      if(this.actualAmount >= this.totalCost){
        //elimiar
        this.clearItemQuoteAccepted();
        for(let i=0; i<this.itemsSelect.length; i++){
          this.registerSelectItem(this.itemsSelect[i].id_qd);
        }
        this.toastr.success('Se registro las elecciones de la cotización con exito');
        this.updateStateAccepted();
        this.navigateTo('/list-quotes')

      }else{
        this.toastr.error('El monto actual de la unidad es menor al solicitado');
      }

    }else{
      this.toastr.warning('Existen Items sin elegir');
    }

  }
  registerSelectItem(idDq:number){

    let register:ItemQuoteAcepted = new ItemQuoteAcepted
    register.id_qd = idDq;
    register.id_request = this.id;
    register.id = localStorage.getItem('quot-umss-usr');
    let res: ResponseQuote;
    this.serviceQuote.registerItemQuoteAccepted(register).subscribe(
      (data) => {
        res = data;
        if (res.res) {
          console.log("se registro el item aceptado")

        } else {
          console.log('Ocurrio un error');
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  clearItemQuoteAccepted(){

    let res: ResponseQuote;
    this.serviceQuote.deleteItmesQuoteAccepted(this.id).subscribe(
      (data) => {
        res = data;
        if (res.res) {

        } else {
          console.log('Ocurrio un error');
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  updateStateAccepted(){
    let res:ResponseQuote
    this.serviceQuote.putStateQuote(this.idQuote,'Aceptado').subscribe(
      (data) => {
        res = data;
        if(res.res){
          console.log("seguardo los cambios con exito")

        }else{
          console.log("error al actualizar el estado intente de nuevo")
        }
      },
      (error) => {
        console.log("error al actualizar el estado")
      }
    );

    this.serviceQuote.putStateRequestQuote(this.id,'Aceptado').subscribe(
      (data) => {
        res = data;
        if(res.res){
          console.log("seguardo los cambios con exito")

        }else{
          console.log("error al actualizar el estado intente de nuevo")
        }
      },
      (error) => {
        console.log("error al actualizar el estado")
      }
    );
  }
  updateStateRejected(){
    let res:ResponseQuote
    this.serviceQuote.putStateQuote(this.idQuote,'Rechazado').subscribe(
      (data) => {
        res = data;
        if(res.res){
          console.log("seguardo los cambios con exito")

        }else{
          console.log("error al actualizar el estado intente de nuevo")
        }
      },
      (error) => {
        console.log("error al actualizar el estado")
      }
    );
    this.serviceQuote.putStateRequestQuote(this.id,'Rechazado').subscribe(
      (data) => {
        res = data;
        if(res.res){
          console.log("seguardo los cambios con exito")

        }else{
          console.log("error al actualizar el estado intente de nuevo")
        }
      },
      (error) => {
        console.log("error al actualizar el estado")
      }
    );
    this.navigateTo('/list-quotes')

  }

  //metodos de rechazo
  isValidRejectedForm(){
    return ( this.rejectedForm.get('reason')?.touched || this.rejectedForm.get('reason')?.dirty) && !this.rejectedForm.get('reason')?.valid;
  }

  getErrorMessageRejected(){
    let message;
    if(this.rejectedForm.get('reason')?.errors?.required){
      message = "El campo Motivo de rechazo es obligatorio";
    }else if(this.rejectedForm.get('reason')?.hasError('minlength')){
      message = "El campo Motivo de rechazo requiere como mínimo 10 caracteres";
    }
    return message;
  }
  registerRejectedForm(){
    if(this.rejectedForm.invalid){
      return;
    }
    this.service.registerRejected(this.rejectedForm.value).subscribe(
      (data) => {
        if(data.res){
          //this.changeStatus("Rechazado", "La solicitud a sido rechazada");
          this.updateStateRejected();
          this.modal.dismissAll();
          this.navigateTo('/list-quotes');

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

  //funcion de la comparacion pendiente*****************
  openModalAccept(content: any){
    if(this.actualAmount >= this.totalCost){
      //this.modal.open(content,{ windowClass:"colorModal"});
    }else{
      this.toastr.error('El monto actual de la unidad es menor al solicitado');
    }
  }
  getAmount(){
    this.service.getActualAmount(localStorage.getItem('quot-umss-u')).subscribe(
      (data) => {
        this.actualAmount = data.amount;
        //this.getPersonal();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }
}
