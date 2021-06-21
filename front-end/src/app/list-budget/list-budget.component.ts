import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { BudgetService } from '../services/budget.service';

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

  showAssigned: boolean = false;

  constructor(
    private router:Router,
    public toastr: ToastrService,
    private titlePage: Title,
    private modal: NgbModal,
    public config: NgbPopoverConfig,
    private route : ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: BudgetService
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

}
