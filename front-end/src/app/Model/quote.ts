export class Quote {
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
  accepted:boolean=false;
}

export class ItemQuoteAcepted{
  id_request: any;
  id_qd:any;
}

export class ResponseQuote{
  res: any;
  message: any;
}
