import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { summarydocumentsResponse } from "../../app-models/bibliography.model";
import { corpussearchResponse } from "../../app-models/corpus.model";
import { ISearchByLemmaResultResponse } from "../../app-models/dictionary.model";
import { BookmarkParmModel } from "../../app-models/user-bookmarks.models";
import { ServicesIDs } from "../collection/serviceurl.enum";
import { ProfileInfo, AccountData, RegistrationData, BookmarkCount, userbookmarksResponse, userbookmarks, usercomment } from "../models/account";
import { CustomResponse, LoginExternalModel, TokenInfo, ActivateAccountModel, ResetPasswordModel, ChangePasswordModel } from "../models/security";

import { HttpService } from "../security/requests/http.service";
import { ServiceUrlManager } from "../security/requests/serviceUrl.Manager";
import { CacheService } from "./cache.service";
import { GlobalConfigurationService } from "./global.configuration.service";
import { SharedService } from "./shared.service";
import { StoreService } from "./store.service";

@Injectable()
export class AccountService {
  constructor( private _sharedService: SharedService,private _http: HttpService, private _storeService: StoreService, private _config: GlobalConfigurationService, private _serviceUrlManager: ServiceUrlManager, private _cacheService: CacheService) {

  }

  GetProfileData(): Observable<ProfileInfo> {
    return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetProfileData)).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  LogIn(accountData: AccountData): Observable<CustomResponse> {
    accountData.email = accountData.email.toLowerCase();
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.Login), accountData).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }


  LogInExternal(accountData: LoginExternalModel): Observable<TokenInfo> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.LoginExternal), accountData).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }


  RegisterUser(user: RegistrationData): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.RegisterUser), user).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }


  ConfirmUserEmail(activateData: ActivateAccountModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ActivateUserAccount), activateData).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }


  ResendActivationCode(activateData: ActivateAccountModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ReSendActivationCode), activateData).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  DownloadRootDocument(rootId: number): Observable<Blob> {
    var parm = ("?rootId=" + rootId);
    const options = { responseType: 'blob' as 'blob' };
    return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetFileByRootId) + parm), options).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  GetBookmarkCount(): Observable<Array<BookmarkCount>> {
    return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetBookmarkCounts)).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  GetLexicalBookmark(prm: BookmarkParmModel): Observable<ISearchByLemmaResultResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexialBookmarks), prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  GetDocumentBookmarks(prm: BookmarkParmModel): Observable<summarydocumentsResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetDocumentBookmarks), prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  GetSearchCriteriaBookmarks(prm: BookmarkParmModel): Observable<userbookmarksResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetSearchCriteriaBookmarks), prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  GetCorpusBookmarks(prm: BookmarkParmModel): Observable<corpussearchResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetCorpusBookmarks), prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  AddBookmark(prm: any, isadd: boolean): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.AddBookmark);
    if (!isadd)
      srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.RemoveBookmark);
    return this._http.post(srvURL, prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  SendComment(prm: usercomment): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.SendComment);
    return this._http.post(srvURL, prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  SendDictionaryComment(prm: any): Observable<CustomResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.SendDictionaryComment);
    return this._http.post(srvURL, prm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  RemoveAllBookmarkByType(typeId: number): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.RemoveAllBookmarkByType);
    return this._http.post(srvURL, typeId).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  AddResetPasswordRequest(email: string): Observable<CustomResponse> {
    const parm: ResetPasswordModel = {email:email} as ResetPasswordModel;
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ResetPasswordRequest), parm).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }


  ResetPassword(resetPassword: ResetPasswordModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ResetPassword), resetPassword).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  UpdateUserProfile(profileInfo : any): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.UpdateUserProfile), profileInfo).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }

  ChangePassword(changePassword: ChangePasswordModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ChangePassword), changePassword).pipe(
      map(data => data,
        (error :any )=> this._sharedService.handleError(error)));
  }
}
