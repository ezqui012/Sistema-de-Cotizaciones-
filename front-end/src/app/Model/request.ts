export class RequestList{
  id_request: any;
  business_name: any;
  name: any;
  status: any;
}

export class RequestQuotation{
  id:any;
  business_name: any;
}
export class ItemRequest{
  id_request: any;
  id_item: any;
  quantity: any;
  total_cost: any;
}
export class NameRequest{
  id_request: any;
  id:any;
  business_name: any;
  date: any;
  status:any;

}
export class RegisterRequestResponse{
  res: any;
  message: any;
  id: any;
}
