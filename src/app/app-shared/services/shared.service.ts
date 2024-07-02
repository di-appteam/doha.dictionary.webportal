import { Injectable } from "@angular/core";
import { ServicesPathList } from "../collection/serviceurl.list";
import { throwError as observableThrowError, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ServicesIDs } from "../collection/serviceurl.enum";
import { CacheService } from "./cache.service";
import { error } from "console";
import { HttpService } from "../security/requests/http.service";
import { ServiceUrlManager } from "../security/requests/serviceUrl.Manager";
import { SharedConfiguration } from "./config.service";
import { StoreService } from "./store.service";
import { LatestWords, MostSearchedWords } from "../../app-models/shared.model";

@Injectable()
export class SharedService {
  private BaseUrl = '/api/';
  public shareUrl:string = "https://www.dohadictionary.org/dictionary/"


  constructor(private _sharedConfiguration : SharedConfiguration,private _http: HttpService, private _storeService: StoreService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager, private _cacheService: CacheService) {

  }

  social_share_url(word: string): string {
    const fullURL = `${this.shareUrl}${word.toString()}`;
    return fullURL;//this.shareUrl.concat(word.trimLeft().trimRight());
  }

  ValidateRecaptcha(encodedResponse: string): Observable<Response> {
    const parm = ('?encodedResponse=' + encodedResponse);
    const srvURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.ValidateRecaptcha) + parm;
    return this._http.get(srvURL).pipe(catchError((error: any) => { return this.handleError(error) }),
      map(data => data));
  }

  GetLatestWords(page:number, pageSize:number): Observable<LatestWords[]> {
    const parm = '?page=' + page + '&pageSize=' + pageSize;
    return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLatestWords) + parm).pipe(catchError((error: any) => { return this.handleError(error) }),
      map(data => data));
}

GetMostSearchedWords(wordtype:number, pageSize:number): Observable<MostSearchedWords[]> {
    //if (!this._config.validToken())
      //return Observable.throw('Server error');
    const parm = '?pageSize=' + pageSize;
    var serviceId = ServicesIDs.GetMostSearchedLemma;
    if (wordtype != 1) {
        serviceId = ServicesIDs.GetMostSearchedRoot;
    }
    return this._http.get(this._serviceUrlManager.getServiceUrl(serviceId) + parm).pipe(catchError((error: any) => { return this.handleError(error) }),
        map(data => data));
}

  public StartService() {
    // this._sharedConfiguration.validToken();
    return new Promise((resolve) => {
      const lookupRequest = this._http.get((this.BaseUrl + 'Lookup/GetAll/'));
      lookupRequest.pipe(catchError((error: any) => { return this.handleError(error) }),map((response) => response))
        .subscribe(a =>
          [
            this._sharedConfiguration.AdditionalTags = a.LkpAdditionalTagList,
            this._sharedConfiguration.SemanticList = a.LkpSemanticFieldList,
            this._sharedConfiguration.AutherList = a.LkpAutherList.map((val : any) => ({
              id: val,
              name: val
            })),
            this._sharedConfiguration.SourceList = a.LkpSourceList,
            this._sharedConfiguration.UserBookmarkList = a.UserBookmarkList ? a.UserBookmarkList : [],
            resolve(this._storeService.AddSetting(a.version))
          ],
          () => [resolve(this._storeService.AddSetting())]
        );
    });
  }
  public getServiceUrl(serviceId: number): string | null {
    if (serviceId < 0 || serviceId > (ServicesPathList.length - 1)) {
      return null;
    }
    return (this.BaseUrl + ServicesPathList[serviceId]);
  }

  public handleError(error: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the //console
    //console.error(error);
    return observableThrowError(error || 'Server error');
  }

}
