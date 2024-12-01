import { Injectable } from "@angular/core";
import { EMPTY, map, Observable } from "rxjs";
import { UserInfo } from "../../app-models/user-account.model";
import { ServicesIDs } from "../collection/serviceurl.enum";
import { CustomResponse, TokenInfo } from "../../app-models/security.model";
import { HttpService } from "../security/requests/http.service";
import { ServiceUrlManager } from "../security/requests/serviceUrl.Manager";
import { CacheService } from "./cache.service";
import { SharedConfiguration } from "./config.service";
import { SharedService } from "./shared.service";
import { StoreService } from "./store.service";

@Injectable()
export class SecurityService {


  constructor(private _http: HttpService, private _sharedService: SharedService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager, private _cacheService: CacheService, private _storeService: StoreService) {

  }

  async StartUpApp() {
    if (typeof window === "undefined")
      return EMPTY;
    if (window.location.href.includes("/#")) {
      window.location.href = window.location.href.replace("/#", "");
      return;
    }
    if (!this.getToken())
      return this.LoadStartupData();
    let userInfoRequest = this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetUserData));
    return new Promise((resolve, reject) => {
      userInfoRequest.pipe(map((response) => response))
        .subscribe(a =>
          [
            resolve(this.SetUserDataToStartup(a))
          ], err => [
            this.clearLoginInfo(), window.location.reload()
          ]
        );
    });
  }

  public validToken(): boolean {
    try {
      return !!(localStorage.getItem('Token'));
    } catch (Error) {
      return false;
    }
  }
  async StartUpForAuthApp() {
    if (window.location.href.includes("/#")) {
      window.location.href = window.location.href.replace("/#", "");
      return;
    }
    if (!this.getToken())
      return this.LoadStartupData();
    let userInfoRequest = this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetUserData));
    return new Promise((resolve, reject) => {
      userInfoRequest.pipe(map((response) => response))
        .subscribe((a: any) =>
          [
            resolve(this.SetUserDataToStartup(a))
          ], (err: any) => [
            this.clearLoginInfo(), window.location.reload()
          ]
        );
    });
  }

  /********************************** Token section **************************************/

  RefreshToken(token: string): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.RefreshToken), token).pipe(
      map(data => data,
        (error:any) => this._sharedService.handleError(error)));
  }

  public RefreshLocalToken(token: TokenInfo) {
    this._cacheService.clearDataCache("Token");
    this._cacheService.addTicket("Token", token);
    this._config.userInfo = this.fillLoginInfo(token);

  }
  // Save Token Info to local Storage
  public saveTokenInfo(token: TokenInfo): void {
    this._config.userInfo = this.fillLoginInfo(token);
    this._cacheService.addTicket("Token", token);
  }
  public clearLoginInfo(): void {
    var token = new TokenInfo();
    this._config.userInfo = new UserInfo();
    token = this._cacheService.getTicket("Token");
    this._cacheService.CheckCashExists(token, "Token");
  }
  public getToken() {
    return this._cacheService.getTicket("Token");
  }

  public fillLoginInfo(token: TokenInfo): UserInfo {
    if (!token)
      return token;
    var user = new UserInfo();
    user.Email = token.Email;
    user.UserID = token.UserID;
    user.ImagePath = token.ImagePath;
    user.Pages = token.Pages;
    user.UserType = token.UserType;
    user.Permissions = token.Permissions;
    user.Name = token.Name;
    return user;
  }

  public SetUserDataToStartup(token: TokenInfo) {
    this._config.userInfo = this.fillLoginInfo(token);
    return this.LoadStartupData();
  }
  LoadStartupData() {
    this._storeService.GetAllSavedDicSearch()
    return this._serviceUrlManager.StartService();
  }
}
