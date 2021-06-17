import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';
import { ItemRequest } from '../Model/expense-item';
import { Quote } from '../Model/quoteModel';


type TableRow = [number, number, string, string, string, number, number, number];
type TableRowE = [number, number, string, string, string, string, string];
const tiempo = Date.now();
const hoy = new Date(tiempo);
//hoy.toLocaleDateString();

export class ReportQuotes {
  constructor(){

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
    const statusRequestData = new Txt(`Estado de la cotización: ${statusQ}`).fontSize(11).alignment('left').end
    const userRequestData = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const userAceptedData = new Txt(`La Solicitud fue aceptada por: ${userName}`).fontSize(11).alignment('left').end
    const personalData = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end

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
  private tableBusinessData(): ITable {
    [{}]
    return new Table([
      [new Txt(`Empresa: ....................................................................................................... `).fontSize(11).alignment('left').end
      , new Txt(`Fecha: .................................. `).fontSize(11).alignment('left').end]
    ])
      .widths([350, 140])
      .layout('noBorders')
      .alignment('center').margin([0,0,0,0])
      .end
  }
  private crateTableE(data: ItemRequest[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Detalle','Dias de entrega', 'Unitario', 'Total'],
      ...this.extractDataE(data)
    ])
      .widths([20, 50, 40, 170, 45, 50, 60])
      .heights(()=>{return 20})
      .layout({
        fillColor:(rowIndex: any, node:any, columnIndex: any) => {
          return rowIndex === 0 ? '#F4F4F4' : '';
        },
        hLineWidth:()=>{
          return 0.5;
        },
        vLineWidth:()=>{
          return 0.5;
        },
        vLineColor:()=>{
          return '#737171';
        },
        paddingTop:()=>{
          return 4;
        }
      })
      .end;
  }
  private extractDataE(data: ItemRequest[]): TableRowE[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, '','','']);
  }
  public generateQuoteEmptyPdf(
    nameFaculty: string,
    items: ItemRequest[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('FORMULARIO DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const titleList = new Txt(`Lista de ítems requeridos:`).bold().fontSize(11).alignment('left').end

    pdf.add(this.tableHeader(nameFaculty));
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(this.tableBusinessData());
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTableE(items));
    pdf.create().open();
  }


}
