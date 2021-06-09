export class RequestDetail {
  business_name: any;
  date: any;
  id_request: any;
  name: any;
}

export class ListItemsRequest{
  quantity: any;
  total_cost: any;
  name_item: any;
  unit_item: any;
  unit_cost: any;
}

export class ResponseObtained{
  res: any;
  message: any;
}

export class RejectedRequest{
  id_request: any;
  reason: any;
  id: any;
}

export class ReportRequestAccepted{
  name:any;
  date:any
}
export class ReportRequestRejected{
  name:any;
  date_rejected:any
}

export class PersonalQuote{
  id: any;
  name: any;
}
