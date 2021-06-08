import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailRequestService } from '../services/detail-request.service';
import { ListItemsRequest, ReportRequestRejected } from '../Model/request-detail';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportRequest } from '../reports/reportRequest';
import { Faculty } from '../Model/faculty';


@Component({
  selector: 'app-request-detail-rejected',
  templateUrl: './request-detail-rejected.component.html',
  styleUrls: ['./request-detail-rejected.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class RequestDetailRejectedComponent implements OnInit {

  business: string = '';
  dateRequest: any;
  userName: any;
  idReq: any;

  items: ListItemsRequest | any;

  totalCost: number = 0;

  reason: string | any;

  actualAmount: number | any;
  report: ReportRequest = new ReportRequest;
  faculty: Faculty = new Faculty;
  nameFaculty:any
  dataRejected: Array<ReportRequestRejected>=[]
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
    this.getRequestRejected();
  }
  getRequestRejected(){
    this.service.getRequestRejected(this.route.snapshot.params.id).subscribe(
      (data) => {
        this.dataRejected = data;

      },
      (error) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
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
        this.showReason(this.route.snapshot.params.id);
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

  showReason(id: any){
    this.service.getReasonRejected(id).subscribe(
      (data) => {
        this.reason = data.reason;
      },
      (error) => {
        console.log(error);
        this.navigateTo('/request-quotation-list');
        this.toastr.error('La solicitud no se encuentra rechazada');
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
    this.report.generateRequestRejectedPdf(this.totalCost, this.business, this.userName,this.dataRejected[0].name, this.dataRejected[0].date_rejected, this.reason, this.dateRequest, this.nameFaculty, this.items)
  }
}
