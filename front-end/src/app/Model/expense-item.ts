export class ExpenseItem {
  id_item: any
  name_item: any;
  type_item: any;
  unit_item: any;
  unit_cost: any;
  description_item: any;
  subtype_item: any;
}

export class ItemRequest{
  id_item: any;
  name_item: any;
  unit_item: any;
  quantity: any;
}

export class RegisterItemModel{
  name_item: any;
  type_item: any;
  unit_item: any;
  unit_cost: any;
  description_item: any;
  subtype_item: any;
}

export class ResponseItem{
  res: any;
  message: any;
}
