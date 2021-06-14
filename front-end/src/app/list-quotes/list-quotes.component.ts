import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';
import { Quote } from '../Model/quoteModel';


type TableRow = [number, number, string, string, string, number, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);

import { ItemQuotes, QuoteList } from '../Model/quoteModel';
import { QuoteService } from '../services/quote.service';
import { ExpenseItems } from '../Model/expenseItem';
import { DetailRequestService } from '../services/detail-request.service';
import { ReportComparative } from '../reports/reportComparative';
import { __await } from 'tslib';
import { QuoteProcessService } from '../services/quote-process.service';
import { ReportRequestAccepted, ReportRequestRejected, UserNameRequest } from '../Model/request-detail';



@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./list-quotes.component.css']
})

export class ListQuotesComponent implements OnInit {
  spinnerType: string | any;
  spinnerName: string | any;
  quotes: Array<QuoteList> = [];
  status: String = '';
  items: Array<ExpenseItems> = [];
  itemsQuotes: Array<ItemQuotes> = [];
  dataRejected: Array<ReportRequestRejected> | any;
  dataAccepted: Array<ReportRequestAccepted> | any;
  userNameRequest: Array<UserNameRequest> | any;
  idQuote: any;
  idRequest: any;
  nameFaculty: any;
  business: any;
  userName: any;
  listaItems: any;
  totalCost: any;
  listaItemsQuote: Array<ItemQuotes> | any;
  listaItemsQuoteSelected: Array<ItemQuotes> | any;
  statusQuote: any = {
    rejected: 'Rechazado',
    accepted: 'Aceptado',
    finalized: 'Finalizado',
    quoteProcess: 'En Espera'

  }
  constructor(
    private router: Router,
    public serviceQuote: QuoteService,
    private titlePage: Title,
    public config: NgbPopoverConfig,
    private service: DetailRequestService,
    public quoteProcessService: QuoteProcessService,
    private spinner: NgxSpinnerService,
    public myUrl: DomSanitizer
  ) {
    this.titlePage.setTitle('Lista de Cotizaciones - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getQoutesFinish();
    this.getFaculty();
  }
  navigateTo(path: String, id: any, idQ: any, entrusted: any, action: any) {
    this.router.navigate([path, id, idQ, entrusted, action]);
  }
  getRequestDataAccepted(idRequest: number) {
    this.service.getRequestAccepted(idRequest).subscribe(
      (data) => {
        this.dataAccepted = data;

      },
      (error) => {
        console.log(`Error: ${error}`);
      }
    );
  }
  getQoutesFinish() {
    this.serviceQuote.getQuoteFinish().subscribe((quote) => {
      this.quotes = quote
      this.spinner.hide(this.spinnerName);
    })
  }
  setStatusQuote(status: string): void {
    this.status = status
  }
  getStatusQuote(status: string): string {
    switch (status) {
      case 'Aceptado': {
        return 'Aceptado';
      }
      case 'Rechazado': {
        return 'Rechazado';
      }
      case 'Finalizado': {
        return 'En espera';
      }
      default: {
        return '';
      }
    }
  }
  getFaculty() {
    this.service.getFaculty(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        this.nameFaculty = data.name_faculty;

      },
      (error) => {
        console.log(`Error: ${error}`);
      }
    );
  }
  getTotal() {
    let price: number = 0;
    this.totalCost = 0;
    for (let total of this.listaItemsQuoteSelected) {
      let cost: number = parseInt(total.quantity) * parseFloat(total.unit_cost);
      price += cost;
    }
    this.totalCost = price;
  }
  //methodosReport
  async generatePdf(idRequest: number, idQuote: number, business: string, userPersonal: string, statusReport: string) {
    this.spinner.show(this.spinnerName);
    this.listaItemsQuote = await this.quoteProcessService.getQuoteProcess(idQuote).toPromise();
    this.userNameRequest = await this.service.getNameUserRequest(idRequest).toPromise();
    if (statusReport === 'Aceptado') {
      this.listaItemsQuoteSelected = await this.service.getAprovedQuote(idRequest).toPromise();
      this.getTotal();
      this.dataAccepted = await this.service.getRequestAccepted(idRequest).toPromise();
      this.generateQuotePerformedPdf(business, this.userNameRequest[0].name, userPersonal, this.dataAccepted[0].name, this.dataAccepted[0].date, 'noRechazado', this.nameFaculty, statusReport, idQuote, this.listaItems)
      this.spinner.hide(this.spinnerName);

    } else if (statusReport === 'Rechazado') {

      this.dataRejected = await this.service.getRequestRejected(idRequest).toPromise();
      this.generateQuotePerformedPdf(business, this.userNameRequest[0].name, userPersonal, this.dataRejected[0].name, this.dataRejected[0].date_rejected, this.dataRejected[0].reason, this.nameFaculty, statusReport, idQuote, this.listaItems)
      this.spinner.hide(this.spinnerName);

    }
  }

  private tableBusinessData(business: string, dateRequest: string): ITable {
    [{}]
    return new Table([
      [new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
        , new Txt(`Fecha: ${dateRequest}`).fontSize(11).alignment('right').end]
    ])
      .widths([380, 110])
      .layout('noBorders')
      .alignment('center').margin([0, 0, 0, 0])
      .end
  }
  private tableHeader(nameFaculty: string): ITable {
    [{}]
    return new Table([
      [new Txt('Universidad Mayor de San Simón').alignment('left').end, new Txt('Fecha: ' + hoy.toLocaleDateString()).alignment('right').end],
      [new Txt(nameFaculty).alignment('left').end, new Txt('Cochabamba-Bolivia').alignment('right').end],
      [new Txt('Sección Adquisiciones').alignment('left').end, '']
    ])
      .widths([300, 200])
      .layout('noBorders')
      .alignment('center').margin([0, 0, 0, 0])
      .end
  }
  protected crateTable(data: ItemQuotes[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Detalle', 'Empresa', 'Periodo', 'Unitario', 'Total'],
      ...this.extractData(data)
    ])
      .widths([15, 38, 30, 110, 100, 35, 35, 35])
      .layout('lightHorizontalLines')
      .end;
  }
  protected extractData(data: ItemQuotes[]): TableRow[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.name_enterprise, row.delivery_days, row.unit_cost, (row.unit_cost * row.quantity)]);
  }


  async generateQuotePerformedPdf(
    business: string,
    nameUserRequest:string,
    personalQuote: string,
    reviewerBy: string,
    dateReviewer: string,
    reason: string,
    nameFaculty: string,
    statusQ: string,
    idQuote: number,
    items: ExpenseItems[]

  ) {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('CUADRO COMPARATIVO DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const titleTable = new Txt('SELECCIÓN DE COTIZACIÓN').bold().fontSize(12).alignment('center').end
    const businessData = new Txt('Razón social: ' + business).fontSize(11).alignment('left').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: ${statusQ}`).fontSize(11).alignment('left').end
    const userAceptedData = new Txt(`Aceptada por: ${reviewerBy}  en fecha: ${dateReviewer}`).fontSize(11).alignment('left').end
    const userRejectedData = new Txt(`Rechazado por: ${reviewerBy}  en fecha: ${dateReviewer}`).fontSize(11).alignment('left').end
    const reasonRejectedData = new Txt(`Motivo de rechazo: ${reason}`).fontSize(11).alignment('left').end
    const personalData = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end
    const nameData = new Txt(`Encargado de la Solicitud: ${nameUserRequest}`).fontSize(11).alignment('left').end
    const totalData = new Txt(`TOTAL: ${this.totalCost}`).bold().fontSize(9).alignment('right').end
    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 9
    });

    pdf.add(businessData)
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(this.listaItemsQuote));
    pdf.add(pdf.ln(2));

    if (statusQ === 'Aceptado') {
      pdf.add(titleTable);
      pdf.add(this.crateTable(this.listaItemsQuoteSelected));
      pdf.add(totalData);
      pdf.add(pdf.ln(1))
      pdf.add(infoRequest);
      pdf.add(nameData);
      pdf.add(personalData);
      pdf.add(statusRequestData);
      pdf.add(userAceptedData);
    } else if (statusQ === 'Rechazado') {

      pdf.add(infoRequest);
      pdf.add(nameData);
      pdf.add(personalData);
      pdf.add(statusRequestData);
      pdf.add(userRejectedData)
      pdf.add(reasonRejectedData)
    }
    pdf.create().open();



  }


}
