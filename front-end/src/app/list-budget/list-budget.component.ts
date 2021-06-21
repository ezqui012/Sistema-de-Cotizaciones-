import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { BudgetService } from '../services/budget.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-budget',
  templateUrl: './list-budget.component.html',
  styleUrls: ['./list-budget.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig]
})
export class ListBudgetComponent implements OnInit {

  spinnerType: string | any;
  spinnerName: string | any;

  listbudget: any;
  listbudgetH: any;

  nameUnit: any;

  showAssigned: boolean = false;

  private patternNumber = /^[0-9]+(\.?[0-9]+)?$/;

  assignedForm = this.fb.group({
    id_unit: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1), Validators.pattern(this.patternNumber)]]
  });

  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    public config: NgbPopoverConfig,
    private route : ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: BudgetService,
    private fb: FormBuilder
  ) {
    this.titlePage.setTitle('Asignacion de presupuesto - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.actualListBudget();
  }

  actualListBudget(){
    this.spinner.show(this.spinnerName);
    this.showAssigned = false;
    let date: string = moment(new Date()).format('YYYY');
    this.service.listBudget(date).subscribe(
      (data) => {
        this.listbudget = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  historyBudget(){
    this.spinner.show(this.spinnerName);
    this.showAssigned = false;
    this.service.historyBudget().subscribe(
      (data) => {
        this.listbudget = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  assignedAmountList(){
    this.spinner.show(this.spinnerName);
    this.showAssigned = true;
    let date: string = moment(new Date()).format('YYYY');
    this.service.listAssigned(date).subscribe(
      (data) => {
        this.listbudget = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  openModal(content: any, id: any) {
    this.assignedForm.controls['id_unit'].setValue(id);
    this.assignedForm.get('amount')?.reset();
    this.modal.open(content, { windowClass: "colorModal" });
  }

  openModalH(content: any, id: any, name:any) {
    this.spinner.show(this.spinnerName);
    this.nameUnit = name;
    this.service.listHistory(id).subscribe(
      (data) => {
        this.listbudgetH = data;
        this.modal.open(content, { windowClass: "colorModal" });
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );

  }

  isValidForm() {
    return (this.assignedForm.get('amount')?.touched || this.assignedForm.get('amount')?.dirty) && !this.assignedForm.get('amount')?.valid;
  }

  getErrorMessage() {
    let message;
    if (this.assignedForm.get('amount')?.errors?.required) {
      message = 'El campo monto es de caracter obligatorio';
    }else if(this.assignedForm.get('amount')?.hasError('pattern')){
      message = 'El campo Monto solo acepta caracteres numéricos';
    }else if(this.assignedForm.get('amount')?.hasError('min')){
      message = 'El campo Monto solo acepta valores mayores a 0';
    }
    return message;
  }

  updateAmount(){
    if(this.assignedForm.invalid){
      this.toastr.error('El campo Monto es incorrecto');
      return;
    }
    this.spinner.show(this.spinnerName);
    this.service.assignedBudget(this.assignedForm.value).subscribe(
      (data) => {
        if(data.res){
          this.spinner.hide(this.spinnerName);
          this.toastr.success('Se asigno el monto a la unidad');
          this.modal.dismissAll();
          this.assignedAmountList();
        }
      },
      (error) => {
        this.modal.dismissAll();
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

}
