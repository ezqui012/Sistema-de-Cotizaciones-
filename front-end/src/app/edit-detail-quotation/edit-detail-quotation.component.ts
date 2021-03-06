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
import { BinnacleService } from '../services/binnacle.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-detail-quotation',
  templateUrl: './edit-detail-quotation.component.html',
  styleUrls: ['./edit-detail-quotation.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditDetailQuotationComponent implements OnInit {

  business_name:any;
  statusQuot:any;

  files: File[] = [];

  idquotation: number | any;

  enterprises: Enterprise[] | undefined;

  items: ItemRequest[] | any;

  oldData: any;

  urlImage: string = 'https://gamery.cl/static/img/not-found-image.jpg';
  imgPrev: boolean = false;
  imgNew: boolean = true;
  private updateIMG: boolean = false;

  dateControl = new FormControl(Validators.required);
  dateErrorMessage:string = 'El campo Fecha es de caracter obligatorio';

  private patternNumber = '^[0-9]+';
  private patternDecimal = /^[0-9]+(\.?[0-9]+)?$/;

  spinnerType: string | any;
  spinnerName: string | any;

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
    private spinner: NgxSpinnerService,
    private serbiceB: BinnacleService
  ) {
    this.titlePage.setTitle('Editar cotizaci??n - QUOT-UMSS');
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.idquotation = this.route.snapshot.params.id;
    this.getEnterprises();
    this.getItemsRequest(this.route.snapshot.params.id);
    this.getQuotInfo(this.route.snapshot.params.id);
    this.getAttachmentFile();
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
      field === 'quantity' || field === 'delivery_days' ? message = `El campo ${fieldSpanish} solo acepta caracteres num??ricos`
      : message = `El campo ${fieldSpanish} solo acepta caracteres num??ricos y decimales`;
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
        this.toastr.error(`Error: ${error}. Recargue la p??gina`);
      }
    );
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
        this.toastr.error(`Error: ${error}. Recargue la p??gina`);
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
        this.toastr.error(`Error: ${error}. Recargue la p??gina`);
      }
    );
  }

  getAttachmentFile(){
    this.serviceQuote.getAttachment(this.route.snapshot.params.idqd).subscribe(
      (data) => {
        if(data !== null){
          this.urlImage = data.file_route;
          this.imgPrev = true;
          this.imgNew = false;
          this.spinner.hide(this.spinnerName);
        }else{
          this.spinner.hide(this.spinnerName);
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
  }

  showDetailUpdate(){
    this.serviceQuote.showDetailQuote(this.route.snapshot.params.idqd).subscribe(
      (data) => {
        this.oldData = JSON.stringify(data);
        this.registerForm.controls['id_enterprise'].setValue(data.id_enterprise);
        this.registerForm.controls['id_item'].setValue(data.id_item);
        this.registerForm.controls['quantity'].setValue(data.quantity);
        this.registerForm.controls['date'].setValue(data.date);
        this.registerForm.controls['delivery_days'].setValue(data.delivery_days);
        this.registerForm.controls['unit_cost'].setValue(data.unit_cost);
        this.registerForm.controls['date'].setValue(data.date);
        // let newDate: moment.Moment = moment.utc(data.date);
        // let dateShow: Date = new Date(newDate.format('YYYY-MM-DD'));
        // dateShow.setDate(dateShow.getDate() + 1);
        // this.dateControl.setValue(dateShow);
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

    // if(this.dateControl.invalid){
    //   this.toastr.error('Existen campos incorrectos');
    //   return;
    // }

    // let newDate: moment.Moment = moment.utc(this.dateControl.value).local();
    // this.registerForm.controls['date'].setValue(newDate.format('YYYY-MM-DD'));

    if(this.registerForm.invalid ){
      this.toastr.error('Existen campos incorrectos');
      return;
    }

    this.spinner.show(this.spinnerName);

    this.serviceQuote.updateDetailQuote(this.route.snapshot.params.idqd, this.registerForm.value).subscribe(
      (data) => {
        if(data.res){
          let binData = {
            table_name: 'quote_detail',
            action: 'Edici??n',
            new_data: JSON.stringify(this.registerForm.value),
            old_data: this.oldData
          };
          this.serbiceB.storeBinnacle(binData).subscribe();
          if(this.updateIMG){
            this.updateAttachmentQuot(this.route.snapshot.params.idqd);
          }else if(this.files.length > 0){
            this.registerAttachment(this.route.snapshot.params.idqd);
          }else{
            this.spinner.hide(this.spinnerName);
            this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
            this.toastr.success('Cotizaci??n actualizada con exito');
          }
        }else{
          this.spinner.hide(this.spinnerName);
          this.toastr.error('Ocurrio un error de conexi??n intente de nuevo');
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error} Intente de nuevo`);
      }
    );
  }

  updateAttachmentQuot(id: any){
    if(this.files.length > 0){
      const fileData = this.files[0];
      const data = new FormData;
      data.append('file', fileData);
      data.append('upload_preset', 'quoteUMSS');
      data.append('cloud_name', 'dmdp1bbnt');

      this.serviceQuote.storeAttachmentCloud(data).subscribe(
        (response) => {
          let newFile = {
            file_route: response.secure_url
          }
          this.updateRouteFile(newFile);
        },
        (error) => {
          this.spinner.hide(this.spinnerName);
          this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
          this.toastr.success('Cotizaci??n actualizada con exito');
          this.toastr.error(`ERROR: ${error} El archivo adjunbto no pudo ser registrado por problemas con el servidor`);
        }
      );
    }else{
      this.serviceQuote.deleteAttachment(this.route.snapshot.params.idqd).subscribe(
        (data) => {
          this.spinner.hide(this.spinnerName);
          if(data.res){
            this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
            this.toastr.success('Cotizaci??n actualizada con exito');
          }
        },
        (error) => {
          this.spinner.hide(this.spinnerName);
          this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
          this.toastr.success('Cotizaci??n actualizada con exito');
          this.toastr.error(`ERROR: ${error} El archivo adjunbto no pudo ser registrado por problemas con el servidor`);
        }
      );
    }
  }

  updateRouteFile(newRoute: any){
    this.serviceQuote.updateAttachment(this.route.snapshot.params.idqd, newRoute).subscribe(
      (data) => {
        this.spinner.hide(this.spinnerName);
        if(data.res){
          this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
          this.toastr.success('Cotizaci??n actualizada con exito');
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
        this.toastr.success('Cotizaci??n actualizada con exito');
        this.toastr.error(`ERROR: ${error} El archivo adjunbto no pudo ser registrado por problemas con el servidor`);
      }
    );
  }

  registerAttachment(id: number){
    const fileData = this.files[0];
    const data = new FormData;
    data.append('file', fileData);
    data.append('upload_preset', 'quoteUMSS');
    data.append('cloud_name', 'dmdp1bbnt');

    this.serviceQuote.storeAttachmentCloud(data).subscribe(
      (response) => {
        let newAttachemt = {
          id_qd: id,
          file_route: response.secure_url
        }
        this.insertAttachemtnApi(newAttachemt);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
        this.toastr.success('Cotizaci??n actualizada con exito');
        this.toastr.error(`ERROR: ${error} El archivo adjunbto no pudo ser registrado por problemas con el servidor`);
      }
    );
  }

  insertAttachemtnApi(attchmentInfo: any){
    this.serviceQuote.storeAttachmentBackend(attchmentInfo).subscribe(
      (data) => {
        this.spinner.hide(this.spinnerName);
        if(data.res){
          this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
          this.toastr.success('Cotizaci??n actualizada con exito');
        }
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.navigateTo(`/quote-list-process/${this.business_name}/${this.idquotation}`);
        this.toastr.success('Cotizaci??n actualizada con exito');
        this.toastr.error(`ERROR: ${error} el archivo no se registro por problemas en el servidor`);
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

  onSelect(event: any) {
    if(this.files.length < 1){
      this.files.push(...event.addedFiles);

    }else{
      this.toastr.error('Solo se puede subir 1 archivo por cada registro de cotizaci??n');
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  showDropZone(){
    this.imgNew = true;
    this.imgPrev = false;
    this.updateIMG = true;
  }

}
