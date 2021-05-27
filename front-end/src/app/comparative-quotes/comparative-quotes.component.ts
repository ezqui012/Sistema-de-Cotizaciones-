import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ExpenseItems } from '../Model/expenseItem';
import { ItemQuoteAcepted, ItemQuotes, ResponseQuote, SelectControlItem } from '../Model/Quote';
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

  constructor(
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public serviceQuote: QuoteService,
    public toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idR');
    this.idQuote = this.route.snapshot.paramMap.get('idQ');
    this.entrusted = this.route.snapshot.paramMap.get('entrusted');
    this.getItems(this.id);
    // console.log("id Re: "+this.id)
    // console.log("id Qu: "+this.idQuote)
  }
  openModal(content: any, idDq:number, pos:number):void{
    this.idDq = idDq;
    this.pos = pos;
    this.modal.open(content,{ windowClass:"colorModal",size: 'sm'});

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

  elegirItem(){
    const itemSelected:SelectControlItem = new SelectControlItem

    itemSelected.id_qd = this.idDq
    itemSelected.id_item = this.idItem
    itemSelected.elected = true;
    this.itemsSelect.push(itemSelected)
    this.showBtn=false
    this.modal.dismissAll()
    console.log(this.itemsSelect)
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
    if(this.items.length === this.itemsSelect.length){
      for(let i=0; i<this.itemsSelect.length; i++){
        this.registerSelectItem(this.itemsSelect[i].id_qd);
      }
      this.toastr.success('Se registro las elecciones de la cotización con exito');
      this.updateStateAccepted();
      this.navigateTo('/list-quotes')

    }else{
      this.toastr.warning('Existen Items sin elegir');
    }

  }
  registerSelectItem(idDq:number){

    let register:ItemQuoteAcepted = new ItemQuoteAcepted
    register.id_qd = idDq
    register.id_request = this.id
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

}
