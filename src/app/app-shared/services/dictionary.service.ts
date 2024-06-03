
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IRootResponse, SearchDictionaryModel, ISearchByLemmaResultResponse, ISummaryLexicalSheet, ICarvingLexicalSheet, ISummaryEtymologicalLexicalSheet, IEtymologicalLexicalSheet } from '../../app-models/dictionary.model';
import { userbookmarks } from '../../app-models/user-account.model';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { AccountService } from './account.service';
import { SharedConfiguration } from './config.service';


@Injectable()
export class DictionaryService {

    constructor(private _http: HttpService, private userService: AccountService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager) {

    }


    SearchInRoot(str:string, page = 0): Observable<IRootResponse> {
        const parm = '?str=' + str + '&page=0&pageSize=10000';
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetRoot) + parm).pipe(
            map(data => data));
    }


    SearchInRootAutoC(str:string, page:number, pageSize:number): Observable<IRootResponse> {
        const parm = '?str=' + str + '&page=' + page + '&pageSize=' + pageSize;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetRootAutoCom) + parm).pipe(
            map(data => data));
    }

    GetRootUpPosition(rootId:number, pageSize:number): Observable<IRootResponse> {
        const parm = '?rootId=' + rootId + '&pageSize=' + pageSize;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetRootUpPosition) + parm).pipe(
            map(data => data));
    }

    GetRootDownPosition(rootId:number, pageSize:number): Observable<IRootResponse> {
        const parm = '?rootId=' + rootId + '&pageSize=' + pageSize;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetRootDownPosition) + parm).pipe(
            map(data => data));
    }

    SearchInLemma(prm: SearchDictionaryModel): Observable<ISearchByLemmaResultResponse> {
        return this._http.post(this._serviceUrlManager.getServiceUrl(ServicesIDs.SearchInLemma), prm).pipe(
            map(data => data));
    }

    SearchByLemmaAutoC(str:string, page:number, pageSize:number): Observable<ISearchByLemmaResultResponse> {
        const parm = '?str=' + str + '&page=' + page + '&pageSize=' + pageSize;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.SearchByLemmaAutoC) + parm).pipe(
            map(data => data));
    }
    getSearchDetail(id: number, type: string, isAdvnSearch: boolean = false): Observable<ISummaryLexicalSheet[]> {
        let serviceURL = '';
        if (type == 'root') {
            serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexicalsheetDetailByRoot) + '?rootId=' + id;
        } else {
            serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexicalsheetDetailById) + '?Id=' + id + '&isAdvnSearch=' + isAdvnSearch;
        }
        return this._http.get(serviceURL).pipe(
            map(data => data));
    }

    getRootDetail(id: number): Observable<ISummaryLexicalSheet[]> {
        let serviceURL = '';
        serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexicalsheetDetailByRoot) + '?rootId=' + id;
        return this._http.get(serviceURL).pipe(
            map(data => data));
    }

    GetCarvingLexicalSheetByRootId(id: number): Observable<ICarvingLexicalSheet[]> {
        const serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetCarvingLexicalSheetByRootId) + '?rootId=' + id;
        return this._http.get(serviceURL).pipe(
            map(data => data));
    }

    GetSummaryEtymologicalLexicalSheetByRootId(id: number): Observable<ISummaryEtymologicalLexicalSheet[]> {
        const serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetSummaryEtymologicalLexicalSheetByRootId) + '?rootId=' + id;
        return this._http.get(serviceURL).pipe(
            map(data => data));
    }


    GetEtymologicalLexicalSheetForLemma(rootId?: number, lemmaId?: number): Observable<IEtymologicalLexicalSheet[]> {
      const serviceURL = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetEtymologicalLexicalSheetForLemma) + '?rootId=' + rootId + '&lemmaId='+lemmaId;
      return this._http.get(serviceURL).pipe(
          map(data => data));
  }

  BookmarkAction(bookmarktypeid: number, item: ISummaryLexicalSheet) {
    const userbookmark: userbookmarks = { bookmarktypeid: bookmarktypeid, saveditemid: item.ID } as userbookmarks;
    const currentBookmarks = this._config.UserBookmarkList.getValue();

    if (!item.IsBookMark) {
      currentBookmarks.push(userbookmark);
      this._config.UserBookmarkList.next(currentBookmarks);
    }

    return this.userService.AddBookmark(userbookmark, !item.IsBookMark);
  }

    private handleError(error:any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the //console
        //console.error(error);
        return observableThrowError(error || 'Server error');
    }

}
