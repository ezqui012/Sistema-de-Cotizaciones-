import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DetailRequestService } from '../services/detail-request.service';
import { ListItemsRequest, PersonalQuote } from '../Model/request-detail';

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
  personal: PersonalQuote[] | any;

  totalCost: number = 0;

  actualAmount: number | any;

  rejectedForm = this.fb.group({
    id_request: [this.route.snapshot.params.id, [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10)]]
  });

  registerQuotForm = this.fb.group({
    id_request: [this.route.snapshot.params.id, [Validators.required]],
    id: ['', [Validators.required]]
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

  openModalAccept(content: any){
    if(this.actualAmount >= this.totalCost){
      this.modal.open(content,{ windowClass:"colorModal"});
    }else{
      this.toastr.error('El monto actual de la unidad es menor al solicitado');
    }
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
    this.service.getActualAmount(localStorage.getItem('quot-umss-u')).subscribe(
      (data) => {
        this.actualAmount = data.amount;
        this.getPersonal();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  getPersonal(){
    this.service.getPersonalList(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        this.personal = data;
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

  isValidForm(){
    return ( this.registerQuotForm.get('id')?.touched || this.registerQuotForm.get('id')?.dirty) && !this.registerQuotForm.get('id')?.valid;
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

  getErrorMessage(){
    let message;
    if(this.registerQuotForm.get('id')?.errors?.required){
      message = "Tiene que seleccionar un cotizador";
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
          this.changeStatus("Rechazado", "La solicitud a sido rechazada");
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

  changeStatus(data: any, messageToast: any){
    let obj = {
      status: data
    }
    this.service.updateStatus(this.rejectedForm.get('id_request')?.value, obj).subscribe(
      (data) => {
        if(data.res){
          this.modal.dismissAll();
          this.toastr.success(messageToast);
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

  assignedQuotation(){
    if(this.registerQuotForm.invalid){
      return;
    }
    this.service.registerQuotation(this.registerQuotForm.value).subscribe(
      (data) => {
        if(data.res){
          this.changeStatus("Cotización", "La solicitud fue aceptada y se encuentra en etapa de cotización");
        }else{
          this.toastr.error('Ocurrio un error intente de nuevo');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error(`Error: ${error} intente nuevamente`);
      }
    );
  }
}
