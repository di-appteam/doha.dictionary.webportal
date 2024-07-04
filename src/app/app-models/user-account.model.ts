export interface AccountData {
    email: string;
    password: string;
}

export interface RegistrationData extends AccountData {
    confirmpassword: string;
    imagepath: string;
}

export interface UserInfo {
    Email: string;
    UserID: string;
    UserType: number;
    ImagePath: string;
    Permissions: string[];
    Pages: string[];
    Name: string;
}

export interface ProfileInfo {
    name: string;
    organization: string;
    job: string;
    mobile: string;
    edudegree : string;
}

export interface TokenInfo extends UserInfo {
    value: string;
    Expiry: number;
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

export class ResetPasswordModel {
    constructor(_email: string, _code: string) {
        this.email = _email;
        this.code = _code;
        this.newpassword = "";
        this.confirmpassword = "";
    }
    email: string;
    code: string;
    newpassword: string;
    confirmpassword: string;
}
export class ActivateAccountModel extends ResetPasswordModel {
}

export interface BookmarkCount {
    TypeId: number;
    Count: number;
}



export class userbookmarks {
  constructor() {
      this.displaydata = "";
      this.displayname = "";
      this.searchcriterias = "";
      this.userid = 0;
      this.bookmarktypeid = 0;
      this.saveditemid = 0;
  }
  userid: number;
  bookmarktypeid: number;
  saveditemid: number;
  displayname: string;
  displaydata: string;
  searchcriterias: string;
}



export interface usercomment {
    userid: number;
    commenttypeid: number;
    commentitemid: number;
    errorincollect: Boolean;
    email: string;
    message: string;
    lemmaValue: string;
    lemmaTagValue: string;
}

export interface userbookmarksResponse {
    Data: Array<userbookmarks>;
    TotalCount: number;
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
