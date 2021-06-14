import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';

interface ListItems {
  quantity: any;
  total_cost: any;
  name_item: any;
  unit_item: any;
  unit_cost: any;
}

type TableRow = [number, number, string, string, number, number];
type TableRowQP = [number, number, string, string, string, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);
//hoy.toLocaleDateString();

export class ReportRequest {
  constructor(){

  }

  public generateRequestPdf(
    totalCost: number,
    business: string,
    userName: string,
    dateRequest: string,
    nameFaculty: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalData = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const textDate = new Txt(`Agradecemos a Uds. cotizamos, los articulos que a continuación se detallan. Luego este formulario debe devolverse en sobre cerrado debidamente firmado  y sellado.`).fontSize(9).end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: Proceso`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    //pdf.add(businessDate);
    pdf.add(this.tableBusinessData(business, dateRequest));
    //pdf.add(dateRequestDate);
    pdf.add(pdf.ln(1))
    pdf.add(textDate);
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalData);
    pdf.add(pdf.ln(1));

    pdf.add(infoRequest);
    pdf.add(userRequestData);
    pdf.add(statusRequestData);
    pdf.create().open();
  }


  private tableBusinessData(business:string, dateRequest:string): ITable {
    [{}]
    return new Table([
      [new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
      , new Txt(`Fecha: ${dateRequest}`).fontSize(11).alignment('right').end]
    ])
      .widths([380, 110])
      .layout('noBorders')
      .alignment('center').margin([0,0,0,0])
      .end
  }
  private tableHeader(nameFaculty:string): ITable {
    [{}]
    return new Table([
      [ new Txt('Universidad Mayor de San Simón').alignment('left').end , new Txt('Fecha: '+hoy.toLocaleDateString()).alignment('right').end],
      [new Txt(nameFaculty).alignment('left').end, new Txt('Cochabamba-Bolivia').alignment('right').end],
      [new Txt('Sección Adquisiciones').alignment('left').end, '']
    ])
      .widths([300, 200])
      .layout('noBorders')
      .alignment('center').margin([0,0,0,0])
      .end
  }
  private crateTable(data: ListItems[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Detalle', 'Unitario', 'Total'],
      ...this.extractData(data)
    ])
      .widths([20, 50, 40, 200, 60, 60])
      /*.layout({fillColor:(rowIndex: any, node: any , columnIndex: any) => {return rowIndex === 0 ? '#D6FCF6' : '';}}

      )*/
      .layout('lightHorizontalLines')
      //.layout({hLineWidth:()=>0.5})
      .end;
  }
  private extractData(data: ListItems[]): TableRow[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.unit_cost, row.total_cost]);
  }


  public generateQuotePerformedPdf(
    totalCost: number,
    business: string,
    userName: string,
    personalQuote:string,
    nameAccepted: string,
    dateAccepted: string,
    dateRequest: string,
    nameFaculty: string,
    items: AcceptedQuote[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalData = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: Aceptado`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const userAceptedData = new Txt(`La Solicitud fue aceptada por: ${nameAccepted}  en fecha: ${dateAccepted}`).fontSize(11).alignment('left').end
    const personalData = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end

    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 10
    });

    pdf.add(this.tableBusinessData(business, dateRequest));
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTableP(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalData);
    pdf.add(pdf.ln(1));

    pdf.add(infoRequest);
    pdf.add(userRequestData);
    pdf.add(personalData);
    pdf.add(statusRequestData);
    pdf.add(userAceptedData);
    pdf.create().open();
  }


  private crateTableP(data: AcceptedQuote[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Detalle','Empresa', 'Unitario', 'Total'],
      ...this.extractDataP(data)
    ])
      .widths([15, 45,40, 120, 120, 40, 40])
      /*.layout({fillColor:(rowIndex: any, node: any , columnIndex: any) => {return rowIndex === 0 ? '#D6FCF6' : '';}}

      )*/
      .layout('lightHorizontalLines')
      //.layout({hLineWidth:()=>0.5})
      .end;
  }
  private extractDataP(data: AcceptedQuote[]): TableRowQP[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.name_enterprise, row.unit_cost, (row.quantity*row.unit_cost)]);
  }


  public generateRequestRejectedPdf(
    totalCost: number,
    business: string,
    userName: string,
    nameRejected:string,
    dateRejected:string,
    reason:string,
    dateRequest: string,
    nameFaculty: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalData = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: Rechazado`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const userRejectedData = new Txt(`La solicitud fue Rechazada por: ${nameRejected}  en fecha: ${dateRejected}`).fontSize(11).alignment('left').end
    const reasonDate = new Txt(`Motivo de rechazo: ${reason}`).fontSize(11).alignment('left').end

    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(this.tableBusinessData(business, dateRequest));
    pdf.add(pdf.ln(2));

    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalData);
    pdf.add(pdf.ln(1));

    pdf.add(infoRequest);
    pdf.add(userRequestData);
    pdf.add(statusRequestData);
    pdf.add(userRejectedData);
    pdf.add(reasonDate);
    pdf.create().open();
  }


  public generateRequestQuotePdf(
    totalCost: number,
    business: string,
    userName: string,
    personalQuote:string,
    dateRequest: string,
    nameFaculty: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalData = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end
    const infoRequest = new Txt(`Información:`).bold().fontSize(11).alignment('left').end
    const statusRequestData = new Txt(`Estado: Cotización`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const personalData = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end

    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(this.tableBusinessData(business, dateRequest));
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalData);
    pdf.add(pdf.ln(1));

    pdf.add(infoRequest);
    pdf.add(userRequestData);
    pdf.add(statusRequestData);
    pdf.add(personalData);
    pdf.create().open();
  }


}
