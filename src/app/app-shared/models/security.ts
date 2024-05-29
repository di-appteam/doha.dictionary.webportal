import { EMPTY } from "rxjs";
import { UserInfo } from "./account";

export class TokenInfo extends UserInfo {
  value: string = "";
  Expiry: number = 0;
}

export interface LoginExternalModel {
  email: string;
  id: string;
  image: string;
  name: string;
  provider: string;
}

export interface ChangePasswordModel {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

export interface ResetPasswordModel {
  email: string;
  code: string;
  newpassword: string;
  confirmpassword: string;
}
export interface ActivateAccountModel extends ResetPasswordModel {
}


export interface CustomResponse {
  ResponseCode: ResponseCode;
  token: TokenInfo;
}


export enum UserType {
  Internal = 1,
  Facebook = 2,
  Google = 3
}

export enum ResponseCode {
  Ok = 0,
  // Activation
  NotFound = 1000,
  Expired = 1001,
  NotMatched = 1002,
  ErrorInActivation = 1003,
  AlreadyActivated = 1004,
  // login
  InValidCredentials = 1010,
  PendingActivationAccount = 1011,
  LockedAccount = 1012,
  // ResetPassword
  NotInternalUser = 2000,
  InActiveAccount = 2001,
  ErrorInRequesting = 2002,
  RequestAlreadyExist = 2003,
  RequestNotExist = 2004,
  InValidRequest = 2005,
  PasswordAlreadyExist = 2006,
  InValidPassword = 2007,
  // user registration
  EmailAlreadyExist = 3000
}
