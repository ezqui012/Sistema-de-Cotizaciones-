export interface List{
    id_list:any;
    name_list:any;
    amount:any;
    type:any;

}

  //Administrative unit
  export class ListUnit {
    id_unit:any;
    name_unit: any;
    name_faculty:any;
    type:any;
    amount:any;
  }
  export class ListUnitData {
    name_unit: any;
    name_faculty:any;
    type:any;
    amount:any;
  }

  export class SpendingUnit{
    res: any;
    message: any;
  }

  export class ResponseRegister{
    res: any;
    message: any;
  }
