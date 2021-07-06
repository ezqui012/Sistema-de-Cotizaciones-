import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { AcceptedQuote } from '../Model/accepted-quote';
import { ExpenseItems } from '../Model/expenseItem';
import { ItemQuotes, Quote } from '../Model/quoteModel';
import { QuoteService } from '../services/quote.service';


type TableRow = [number, number, string, string, string, number, number, number];
//type TableRowQP = [number, number, string, string, string, number, number];
const tiempo = Date.now();
const hoy = new Date(tiempo);
//hoy.toLocaleDateString();

export class ReportComparative {

  itemsQuotes:Array<ItemQuotes>=[];
  idQuote:any;
  //serviceQuote: QuoteService = new QuoteService;
  constructor(
    public serviceQuote: QuoteService,

  ){

  }
  getItemsQuote(idQuote:any, idItem:any){
    //console.log("llega el id: "+idItem)
    //console.log(this.idQuote)
    //this.idItem = idItem;
    this.serviceQuote.getItemsQuotes(idQuote, idItem).subscribe((data)=> {
      this.itemsQuotes = data

    })

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
  private crateTable(data: ItemQuotes[]): ITable {
    [{}]
    return new Table([
      ['Nº', 'Cantidad', 'Unidad', 'Decripción','Empresa','Periodo', 'Unitario', 'Total'],
      ...this.extractData(data)
    ])
      .widths([15, 38, 30, 110,100, 35, 35, 35])
      /*.layout({fillColor:(rowIndex: any, node: any , columnIndex: any) => {return rowIndex === 0 ? '#D6FCF6' : '';}}

      )*/
      .layout('lightHorizontalLines')
      //.layout({hLineWidth:()=>0.5})
      .end;
  }
  private extractData(data: ItemQuotes[]): TableRow[] {
    let i = 1;
    return data.map(row => [(i++), row.quantity, row.unit_item, row.name_item, row.name_enterprise, row.delivery_days, row.unit_cost, (row.unit_cost * row.quantity)]);
  }


  public generateQuotePerformedPdf(
    business: string,
    userName: string,
    personalQuote:string,
    nameFaculty: string,
    statusQ:string,
    //itemsQuote: Quote[],
    idQuote:number,
    items:ExpenseItems[]


  ): void {
    const pdf = new PdfMakeWrapper();
    const title = new Txt('REPORTE DE COTIZACIÓN').bold().fontSize(14).alignment('center').end
    const businessData = new Txt('Solicitud: '+business).fontSize(11).alignment('left').end
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

    for(let i=0; i<items.length; i++){
      this.getItemsQuote(idQuote, items[i].id_item)
      pdf.add(this.crateTable(this.itemsQuotes));
      pdf.add(pdf.ln(1));
    }

    pdf.add(pdf.ln(2));

    pdf.add(infoRequest);
    pdf.add(personalData);
    pdf.add(statusRequestData);
    pdf.create().open();
  }


}
