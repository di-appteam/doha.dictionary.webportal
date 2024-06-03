export interface AccountData {
  email: string;
  password: string;
}

export interface RegistrationData extends AccountData {
  confirmpassword: string;
  imagepath: string;
}

export class UserInfo {
  Email: string = "" ;
  UserID: string= "" ;
  UserType: number= 0;
  ImagePath: string = "" ;
  Permissions: string[] = [];
  Pages: string[] = [];
  Name: string = "";
}

export interface ProfileInfo {
  name: string;
  organization: string;
  job: string;
  mobile: string;
  edudegree : string;
}

export interface BookmarkCount {
  TypeId: number;
  Count: number;
}


export interface userbookmarks {
  userid: number;
  bookmarktypeid: number;
  saveditemid: number;
  displayname: string;
  displaydata: string;
  searchcriterias: string;
}




export class usercomment {
  userid: number = 0;
  commenttypeid: number = 0;
  commentitemid: number = 0;
  errorincollect: Boolean = false;
  email: string = "";
  message: string = "";
  lemmaValue: string = "";
  lemmaTagValue: string = "";
}

export interface userbookmarksResponse {
  Data: Array<userbookmarks>;
  TotalCount: number;
}
