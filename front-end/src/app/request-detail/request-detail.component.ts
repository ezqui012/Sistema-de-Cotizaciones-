import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailRequestService } from '../services/detail-request.service';
import { ListItemsRequest } from '../Model/request-detail';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})

export class RequestDetailComponent implements OnInit {

  business: string = '';
  dateRequest: any;
  userName: any;
  idReq: any;

  items: ListItemsRequest | any;

  totalCost: number = 0;

  actualAmount: number | any;

  rejectedForm = this.fb.group({
    id_request: [this.route.snapshot.params.id,[Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private modal: NgbModal,
    public toastr: ToastrService,
    private titlePage: Title,
    private route: ActivatedRoute,
    private router:Router,
    private service: DetailRequestService,
    private fb: FormBuilder
  ) {
    this.titlePage.setTitle('Detalle de solicitud - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.getInfoRequestById(this.route.snapshot.params.id);
  }

  openModal(content: any){
    this.modal.open(content,{ windowClass:"colorModal"});
  }

  getInfoRequestById(id: any){
    this.service.getInfoRequest(id).subscribe(
      (data) => {
        this.idReq = data.id_request;
        this.business = data.business_name;
        this.dateRequest = data.date;
        this.userName = data.name;
        this.listItems(this.route.snapshot.params.id);
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  listItems(id: any){
    this.service.getItemsRequest(id).subscribe(
      (data) => {
        this.items = data;
        this.getTotal();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  getTotal(){
    let price:number = 0;
    for(let total of this.items){
      price += parseFloat(total.total_cost);
    }
    this.totalCost = price;
    this.getAmount();
  }

  getAmount(){
    /*Obtener el id de la unidad y cambiar */
    this.service.getActualAmount(3).subscribe(
      (data) => {
        this.actualAmount = data.amount;
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

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

  registerRejected(){
    if(this.rejectedForm.invalid){
      return;
    }
    this.modal.dismissAll();
    this.toastr.success("La solicitud a sido rechazada");
  }
}
