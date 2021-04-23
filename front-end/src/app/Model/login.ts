export class Login {
  email: any;
  password: any
}

export class LoginResponse{
  res: any;
  token: any;
  message: any;
  role: any;
}

export class LoginResponseFail{
  res: any;
  message: any;
}

export class LogoutResponse{
  res: any;
  message: any;
}
