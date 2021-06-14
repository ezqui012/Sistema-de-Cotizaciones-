import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';
import { Quote } from '../Model/quoteModel';


type TableRow = [number, number, string, string, string, number, number, number];
//type TableRowQP = [number, number, string, string, string, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);
//hoy.toLocaleDateString();

export class ReportQuotes {
  constructor(){

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
      [ new Txt('Universidad Mayor de San Simón').alignment('left').end , new Txt('fecha: '+hoy.toLocaleDateString()).alignment('right').end],
      [new Txt(nameFaculty).alignment('left').end, new Txt('Cochabamba-Bolivia').alignment('right').end],
      [new Txt('Sección Adquisiciones').alignment('left').end, '']
    ])
      .widths([300, 200])
      .layout('noBorders')
      .alignment('center').margin([0,0,0,0])
      .end
  }
  private crateTable(data: Quote[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Detalle','Empresa','Periodo', 'Unitario', 'Total'],
      ...this.extractData(data)
    ])
      .widths([15, 38, 30, 110,100, 35, 35, 35])

      .layout('lightHorizontalLines')
      .end;
  }
  private extractData(data: Quote[]): TableRow[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.name_enterprise, row.delivery_days, row.unit_cost, (row.unit_cost * row.quantity)]);
  }


  public generateQuotePerformedPdf(
    business: string,
    userName: string,
    personalQuote:string,
    nameFaculty: string,
    statusQ:string,
    items: Quote[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('REPORTE DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const businessData = new Txt('Razón social: '+business).fontSize(11).alignment('left').end
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
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(2));

    pdf.add(infoRequest);
    pdf.add(personalData);
    pdf.add(statusRequestData);
    pdf.create().open();
  }


}
