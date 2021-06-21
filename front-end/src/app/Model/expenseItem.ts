export class ExpenseItems {
  id_item: any;
  name_item: any;
  unit_item: any;

}
export class DateExpenseItem{
  id_item: any;
  name_item: any;
  type_item: any;
  unit_item: any;
  unit_cost: any;
  description_item: any;
  subtype_item: any;
}
export class RequestItemDetail{
  id_resquest: any;
  id_item: any;
  quantity: any;
  total_cost: any;
}
export class RequestItem{
  id_item: any;
  quantity: any;
  unit_item: any;
  name_item: any;
  unit_cost: any;
  total_cost: any;
  index_item: any;
}
export class ResponseItems{
  res: any;
  message: any;
}
