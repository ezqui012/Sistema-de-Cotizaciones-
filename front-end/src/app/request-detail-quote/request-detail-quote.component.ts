import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailRequestService } from '../services/detail-request.service';
import { ListItemsRequest } from '../Model/request-detail';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportRequest } from '../reports/reportRequest';
import { Faculty } from '../Model/faculty';

@Component({
  selector: 'app-request-detail-quote',
  templateUrl: './request-detail-quote.component.html',
  styleUrls: ['./request-detail-quote.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class RequestDetailQuoteComponent implements OnInit {

  personalQuote: string | any;

  business: string = '';
  dateRequest: any;
  userName: any;
  idReq: any;

  items: ListItemsRequest | any;

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
  }
  //methodo report
  generatePdf(){
    this.report.generateRequestQuotePdf(this.totalCost, this.business, this.userName, this.personalQuote, this.dateRequest, this.nameFaculty, this.items)
  }
}
