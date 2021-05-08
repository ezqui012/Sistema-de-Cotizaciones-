export interface Unit{
  id_unit: any;
  id_faculty: any;
  name_unit: any;
}
//Administrative unit
export class UnitA {
  id_faculty: any;
  name_unit: any;
  type: any;
}   

export class SpendingUnit{
  id_faculty: any;
  name_unit: any;
  type: any;
  amount: any;
}

export class RegisterUnitResponse{
  res: any;
  message: any;
}
