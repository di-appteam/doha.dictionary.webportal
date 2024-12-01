import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { summarydocumentsResponse } from "../../app-models/bibliography.model";
import { corpussearchResponse } from "../../app-models/corpus.model";
import { ISearchByLemmaResultResponse } from "../../app-models/dictionary.model";
import { AccountData, BookmarkCount, ProfileInfo, RegistrationData, userbookmarksResponse, usercomment } from "../../app-models/user-account.model";
import { BookmarkParmModel } from "../../app-models/user-bookmarks.models";
import { ServicesIDs } from "../collection/serviceurl.enum";
import { CustomResponse, LoginExternalModel, TokenInfo, ActivateAccountModel, ResetPasswordModel, ChangePasswordModel } from "../../app-models/security.model";

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
    return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetProfileData)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data));
  }

  LogIn(accountData: AccountData): Observable<CustomResponse> {
    accountData.email = accountData.email.toLowerCase();
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.Login), accountData).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


  LogInExternal(accountData: LoginExternalModel): Observable<TokenInfo> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.LoginExternal), accountData).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


  RegisterUser(user: RegistrationData): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.RegisterUser), user).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


  ConfirmUserEmail(activateData: ActivateAccountModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ActivateUserAccount), activateData).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


  ResendActivationCode(activateData: ActivateAccountModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ReSendActivationCode), activateData).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  DownloadRootDocument(rootId: number): Observable<Blob> {
    var parm = ("?rootId=" + rootId);
    const options = { responseType: 'blob' as 'blob' };
    return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetFileByRootId) + parm), options).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  GetBookmarkCount(): Observable<Array<BookmarkCount>> {
    return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetBookmarkCounts)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  GetLexicalBookmark(prm: BookmarkParmModel): Observable<ISearchByLemmaResultResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexialBookmarks), prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  GetDocumentBookmarks(prm: BookmarkParmModel): Observable<summarydocumentsResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetDocumentBookmarks), prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  GetSearchCriteriaBookmarks(prm: BookmarkParmModel): Observable<userbookmarksResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetSearchCriteriaBookmarks), prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  GetCorpusBookmarks(prm: BookmarkParmModel): Observable<corpussearchResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetCorpusBookmarks), prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  AddBookmark(prm: any, isadd: boolean): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.AddBookmark);
    if (!isadd)
      srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.RemoveBookmark);
    return this._http.post(srvURL, prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  SendComment(prm: usercomment): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.SendComment);
    return this._http.post(srvURL, prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  SendDictionaryComment(prm: any): Observable<CustomResponse> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.SendDictionaryComment);
    return this._http.post(srvURL, prm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  RemoveAllBookmarkByType(typeId: number): Observable<Response> {
    if (!this._config.validToken())
      return this._sharedService.handleError('Server error');
    var srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.RemoveAllBookmarkByType);
    return this._http.post(srvURL, typeId).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  AddResetPasswordRequest(email: string): Observable<CustomResponse> {
    const parm: ResetPasswordModel = {email:email} as ResetPasswordModel;
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ResetPasswordRequest), parm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


  ResetPassword(resetPassword: ResetPasswordModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ResetPassword), resetPassword).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  UpdateUserProfile(profileInfo : any): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.UpdateUserProfile), profileInfo).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }

  ChangePassword(changePassword: ChangePasswordModel): Observable<CustomResponse> {
    return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.ChangePassword), changePassword).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
      map(data => data
        ));
  }


}
