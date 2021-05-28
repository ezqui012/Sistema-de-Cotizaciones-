export class Quote{
  quantity: any;
  unit_item: any;
  name_item:any;
  business_name: any;
  name_enterprise: any;
  delivery_days: any;
  unit_cost: any;
  status_quotation: any;
  Total:any;
  id_qd:any;
  id_request:any;
}

export class QuoteFinalized{
  quantity: any;
  unit_item: any;
  name_item:any;
  business_name: any;
  name_enterprise: any;
  delivery_days: any;
  unit_cost: any;
  status_quotation: any;
  id_request:any;
}

export class QuoteTwo {
  id_quotation: any;
  id_request: any;
  id: any;
  status_quotation: any;
}

export class QuoteList{
  id_quotation: any;
  id_request: any;
  business_name: any;
  name: any;
  status_quotation: any;
}

export class ItemQuotes{
  id_qd: any;
  id_request: any;
  quantity: any;
  unit_item: any;
  name_item: any;
  name_enterprise: any;
  delivery_days: any;
  unit_cost: any;
  //accepted:boolean=false;
}
export class SelectControlItem{
  id_qd:any;
  id_item:any;
  elected:any;
}
export class ItemQuoteAcepted{
  id_request: any;
  id_qd:any;
}

export class ResponseQuote{
  res: any;
  message: any;
}
