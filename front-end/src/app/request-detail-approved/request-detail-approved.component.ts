import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailRequestService } from '../services/detail-request.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AcceptedQuote } from '../Model/accepted-quote';
import { ReportRequest } from '../reports/reportRequest';
import { Faculty } from '../Model/faculty';

@Component({
  selector: 'app-request-detail-approved',
  templateUrl: './request-detail-approved.component.html',
  styleUrls: ['./request-detail-approved.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class RequestDetailApprovedComponent implements OnInit {

  personalQuote: string | any;

  business: string = '';
  dateRequest: any;
  userName: any;
  idReq: any;

  items: AcceptedQuote | any;

  totalCost: number = 0;

  actualAmount: number | any;
  report: ReportRequest = new ReportRequest;
  faculty: Faculty = new Faculty;
  nameFaculty:any

  constructor(
    public toastr: ToastrService,
    private titlePage: Title,
    private route: ActivatedRoute,
    private router: Router,
    private service: DetailRequestService
  ) {
    this.titlePage.setTitle('Detalle de solicitud - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.getInfoRequestById(this.route.snapshot.params.id);
    this.getFaculty();
  }
  getFaculty(){
    this.service.getFaculty(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        this.faculty = data;
        this.nameFaculty = data.name_faculty;

      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }
  getInfoRequestById(id: any){
    this.service.getInfoRequest(id).subscribe(
      (data) => {
        this.idReq = data.id_request;
        this.business = data.business_name;
        this.dateRequest = data.date;
        this.userName = data.name;
        this.showPersonalQuote(this.route.snapshot.params.id);
        this.listItems(this.route.snapshot.params.id);
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  showPersonalQuote(id: any){
    this.service.getPersonalQuote(id).subscribe(
      (data) => {
        this.personalQuote = data.name;
      },
      (error) => {
        console.log(error);
        this.navigateTo('/request-quotation-list');
        this.toastr.error('La solicitud no se encuentra en cotización');
      }
    );
  }

  listItems(id: any){
    this.service.getAprovedQuote(id).subscribe(
      (data) => {
        this.items = data;
        console.log(data);
        this.getTotal();
      },
      (error) => {
        console.log(`Error: ${error}`);
        this.navigateTo('/request-quotation-list');
        this.toastr.error('La solicitud no se encuentra aceptada o en cotización');
      }
    );
  }

  getTotal(){
    let price:number = 0;
    for(let total of this.items){
      let cost: number = parseInt(total.quantity) * parseFloat(total.unit_cost);
      price += cost;
    }
    this.totalCost = price;
  }

  getTotalItem(cant: number, price:number){
    let cost: number = cant * price;
    return cost;
  }
  //methodo report
  generatePdf(){
    this.report.generateQuotePerformedPdf(this.totalCost, this.business, this.userName, this.personalQuote, this.dateRequest, this.nameFaculty, this.items)
  }
}
