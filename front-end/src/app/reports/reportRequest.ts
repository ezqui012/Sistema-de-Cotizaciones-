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
//type TableRow = [number, number, string, string, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);
hoy.toLocaleDateString();
export class ReportRequest {
  constructor(){

  }

  public generateRequestPdf(
    totalCost: number,
    business: string,
    userName: string,
    dateRequest: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalDate = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const businessDate = new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
    const userDate = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const dateRequestDate = new Txt(`Fecha de la solicitud: ${dateRequest}`).fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end

    pdf.add(this.tableHeader());
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(businessDate);
    pdf.add(userDate);
    pdf.add(dateRequestDate);
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalDate);
    pdf.create().print();
  }
  public generateQuotePerformedPdf(
    totalCost: number,
    business: string,
    userName: string,
    personalQuote:string,
    dateRequest: string,
    items: AcceptedQuote[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalDate = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const businessDate = new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
    const userDate = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const personalDate = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end
    const dateRequestDate = new Txt(`Fecha de la solicitud: ${dateRequest}`).fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end

    pdf.add(this.tableHeader());
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(businessDate);
    pdf.add(userDate);
    pdf.add(personalDate);
    pdf.add(dateRequestDate);
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTableP(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalDate);
    pdf.create().open();
  }



  public generateRequestRejectedPdf(
    totalCost: number,
    business: string,
    userName: string,
    //personalQuote:string,
    reason:string,
    dateRequest: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalDate = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const businessDate = new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
    const userDate = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const reasonDate = new Txt(`Motivo de rechazo: ${reason}`).fontSize(11).alignment('left').end
    const dateRequestDate = new Txt(`Fecha de la solicitud: ${dateRequest}`).fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end

    pdf.add(this.tableHeader());
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(businessDate);
    pdf.add(userDate);
    pdf.add(reasonDate);
    pdf.add(dateRequestDate);
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalDate);
    pdf.create().open();
  }


  public generateRequestQuotePdf(
    totalCost: number,
    business: string,
    userName: string,
    personalQuote:string,
    dateRequest: string,
    items: ListItems[],

  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('SOLICITUD DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const totalDate = new Txt(`TOTAL: ${totalCost}`).bold().fontSize(11).alignment('right').end
    const businessDate = new Txt(`Razón social: ${business}`).fontSize(11).alignment('left').end
    const userDate = new Txt(`Encargado de la Solicitud: ${userName}`).fontSize(11).alignment('left').end
    const personalDate = new Txt(`Encargado de la Cotización: ${personalQuote}`).fontSize(11).alignment('left').end
    const dateRequestDate = new Txt(`Fecha de la solicitud: ${dateRequest}`).fontSize(11).alignment('right').end
    const titleList = new Txt(`Lista de Items:`).bold().fontSize(11).alignment('left').end

    pdf.add(this.tableHeader());
    pdf.add(pdf.ln(2))

    pdf.add(title)
    pdf.add(pdf.ln(1))
    pdf.defaultStyle({
      fontSize: 11
    });

    pdf.add(businessDate);
    pdf.add(userDate);
    pdf.add(personalDate);
    pdf.add(dateRequestDate);
    pdf.add(pdf.ln(2));
    pdf.add(titleList);
    pdf.add(this.crateTable(items));
    pdf.add(pdf.ln(1))
    pdf.add(totalDate);
    pdf.create().print();
  }
  private tableHeader(): ITable {
    [{}]
    return new Table([
      ['Universidad Mayor de San Simón', 'fecha: '+hoy.toLocaleDateString()],
      ['Sección Adquisiciones', 'Cochabamba-Bolivia']
    ])
      .widths([300, 200])
      .layout('noBorders')
      .alignment('center').margin([0,0,0,0])
      .end
  }

  private crateTable(data: ListItems[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Decripción', 'Unitario', 'Total'],
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
  private crateTableP(data: AcceptedQuote[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Decripción','Empresa', 'Unitario', 'Total'],
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

}
