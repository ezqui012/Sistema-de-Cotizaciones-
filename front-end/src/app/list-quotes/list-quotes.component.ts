import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';
import { Quote } from '../Model/quoteModel';


type TableRow = [number, number, string, string, string, number, number, number];
//type TableRowQP = [number, number, string, string, string, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);

import { ItemQuotes, QuoteList } from '../Model/quoteModel';
import { QuoteService } from '../services/quote.service';
import { ExpenseItems } from '../Model/expenseItem';
import { DetailRequestService } from '../services/detail-request.service';
import { ReportComparative } from '../reports/reportComparative';
import { __await } from 'tslib';
import { QuoteProcessService } from '../services/quote-process.service';



@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./list-quotes.component.css']
})

export class ListQuotesComponent implements OnInit {
  quotes: Array<QuoteList> = [];
  status: String = '';
  items: Array<ExpenseItems> = [];
  itemsQuotes: Array<ItemQuotes> = [];
  idQuote: any;
  idRequest: any;
  nameFaculty: any;
  business: any;
  userName: any;
  listaItems: any;
  listaItemsQuote: any;
  //report: ReportComparative = new ReportComparative;
  fileUrl:any;
  statusQuote: any = {
    //process: 'Proceso',
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
    public quoteProcessService:QuoteProcessService,
    public myUrl:DomSanitizer
    //public report: ReportComparative
  ) {
    this.titlePage.setTitle('Lista de Cotizaciones - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.getQoutesFinish();
    this.getFaculty();
  }
  navigateTo(path: String, id: any, idQ: any, entrusted: any) {
    this.router.navigate([path, id, idQ, entrusted]);
  }
  getQoutesFinish() {
    this.serviceQuote.getQuoteFinish().subscribe((quote) => {
      this.quotes = quote

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
 //metodo Tabla entera
 /*getFinalizedQuote(idQuote: number, business: string, userName: string){
  this.quoteProcessService.getQuoteFinalized(this.idQuote).subscribe((res)=>{
  this.quotes = res
  this.generateQuotePerformedPdf(business, userName, userName, this.nameFaculty, 'Proceso', idQuote, this.quotes)

  })
}*/
  //methodo for report
  getFaculty() {
    this.service.getFaculty(localStorage.getItem('quot-umss-f')).subscribe(
      (data) => {
        //this.faculty = data;
        this.nameFaculty = data.name_faculty;

      },
      (error) => {
        console.log(`Error: ${error}`);
        //this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }
  /*async getItemsSync(idRequest: number) {
    /*this.serviceQuote.getItemsRequestSync(idRequest).subscribe((item) => {
      this.items = item
      //console.log(item)
      //this.generateQuotePerformedPdf(business, userName, userName, this.nameFaculty, 'Proceso', idQuote, this.items)

    })*/
    /*this.lista = await this.serviceQuote.getItemsRequestSync(idRequest).toPromise();
    console.log("eres la promesas:")
    console.log(this.lista)
  }*/
 async getItemsQuoteSync(idQuote: any, idItem: any){
    //console.log("llega el id: "+idItem)
    //console.log(this.idQuote)
    //this.idItem = idItem;

    //this.lista = await this.serviceQuote.getItemsQuotesSync(idQuote, idItem).toPromise();
    //console.log(this.lista)

    /*this.serviceQuote.getItemsQuotesSync(idQuote, idItem).subscribe((data) => {
      this.itemsQuotes = data
      return data;
    })*/

  }
  //methodosReport
  async generatePdf(idRequest: number, idQuote: number, business: string, userName: string) {
     //this.getItemsSync(idRequest);
     this.listaItems = await this.serviceQuote.getItemsRequestSync(idRequest).toPromise();

     this.generateQuotePerformedPdf(business, userName, userName, this.nameFaculty, 'Proceso', idQuote, this.listaItems)
     //console.log(this.listaItems)
   }
  ////
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
      [new Txt('Universidad Mayor de San Simón').alignment('left').end, new Txt('fecha: ' + hoy.toLocaleDateString()).alignment('right').end],
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
      /*.layout({fillColor:(rowIndex: any, node: any , columnIndex: any) => {return rowIndex === 0 ? '#D6FCF6' : '';}}

      )*/
      .layout('lightHorizontalLines')
      //.layout({hLineWidth:()=>0.5})
      .end;
  }
  protected extractData(data: ItemQuotes[]): TableRow[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.name_enterprise, row.delivery_days, row.unit_cost, (row.unit_cost * row.quantity)]);
  }


  async generateQuotePerformedPdf(
    business: string,
    userName: string,
    personalQuote: string,
    nameFaculty: string,
    statusQ: string,
    idQuote: number,
    items: ExpenseItems[]


  ) {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('CUADRO COMPARATIVO DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const businessData = new Txt('Razón social: ' + business).fontSize(11).alignment('left').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: ${statusQ}`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const userAceptedData = new Txt(`La Solicitud fue aceptada por: ${userName}`).fontSize(11).alignment('left').end
    const personalData = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end
    const userRejectedData = new Txt(`Rechazado por: ${userName}`).fontSize(11).alignment('left').end

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

    for (let i = 0; i < items.length; i++) {

      //console.log(this.itemsQuotes)
      this.listaItemsQuote = await this.serviceQuote.getItemsQuotesSync(idQuote, items[i].id_item).toPromise();
      //this.getItemsQuoteSync(idQuote, items[i].id_item)
      pdf.add(this.crateTable(this.listaItemsQuote));
      pdf.add(pdf.ln(1));
      //pdf.add("tabla: "+(i++))
    }

    //pdf.add(this.crateTable(this.itemsQuotes));
    //pdf.add(pdf.ln(1));
    pdf.add(pdf.ln(2));

    pdf.add(infoRequest);
    pdf.add(personalData);
    pdf.add(statusRequestData);


    //let myUrl:DomSanitizer | any;
    /*pdf.create().getDataUrl((dataUrl:any)=>{
      //let myUrl:DomSanitizer
      this.myUrl.bypassSecurityTrustResourceUrl(dataUrl);
      console.log(this.myUrl)
    });*/
    //this.fileUrl = file.getDataUrl()
    //console.log(pdf);
    //window.open(file.getDataUrl();
    pdf.create().open();
    //window.open(pdf.permissions(),'_blank')
  }
  setList(itemsQuotes:ItemQuotes[]){
    console.log("lo actualizo")
    this.itemsQuotes = itemsQuotes;
    console.log(this.itemsQuotes)
  }


}
