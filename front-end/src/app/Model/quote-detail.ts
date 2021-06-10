export class QuoteDetail {
}

export class RegisterQuoteDetail{
  id_enterprise: any;
  id_item: any;
  id_quotation: any;
  quantity: any;
  unit_cost: any;
  date: any;
  delivery_days: any;
}

export class ResponseRegisterQuote{
  res:any;
  message: any;
  id: any;
}

export class AttachmentStore{
  id_qd: any;
  file_route: any;
}

export class Attachment{
  id_attachment: any;
  id_qd: any;
  file_route: any;
}
