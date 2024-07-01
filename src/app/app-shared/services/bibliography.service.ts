import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { summarydocumentsResponse, carvingsourceabvResponse, carvingsourceResponse, summarydocuments, SearchSDModel } from "../../app-models/bibliography.model";
import { userbookmarks } from "../../app-models/user-account.model";
import { ServicesIDs } from "../collection/serviceurl.enum";
import { HttpService } from "../security/requests/http.service";
import { ServiceUrlManager } from "../security/requests/serviceUrl.Manager";
import { AccountService } from "./account.service";
import { SharedConfiguration } from "./config.service";
import { SharedRootComponentValues } from "./root.general.service";


@Injectable()
export class BibliographyService {

    constructor(private _http: HttpService,private userService : AccountService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager, private _sharedRootComponentValues: SharedRootComponentValues) {

    }

    CarvingGetAllDocumetnts(page:number, searchSD:SearchSDModel, pageSize = this._config.PageSize): Observable<summarydocumentsResponse> {
        const parm = '?page=' + page + '&pageSize=' + pageSize;
        return this._http.post((this._serviceUrlManager.getServiceUrl(ServicesIDs.CarvingGetAllDocumetnts) + parm), searchSD).pipe(
            map(data => data));
    }

    private GetAllDocumetnts(page:number, searchSD:SearchSDModel, pageSize = this._config.PageSize): Observable<summarydocumentsResponse> {
        const parm = '?page=' + page + '&pageSize=' + pageSize;
        return this._http.post((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetAllDocumetnts) + parm), searchSD).pipe(
            map(data => data));
    }

    getbibliography(page:number, searchSD: SearchSDModel, pageSize = this._config.PageSize): Observable<summarydocumentsResponse> {
        return this.GetAllDocumetnts(page, searchSD, pageSize);
        /* if (searchSD.sourceType == 1)
           return this.GetAllDocumetnts(page, searchSD, pageSize);
       return this.CarvingGetAllDocumetnts(page, searchSD, pageSize);*/
    }
    getAllCarvingSourceABV(page:number, pageSize = this._config.PageSize): Observable<carvingsourceabvResponse> {
        const parm = '?page=' + page + '&pageSize=' + pageSize;
        return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetAllCarvingSourceABV) + parm)).pipe(
            map(data => data));
    }
    getAllCarvingSource(page:number, pageSize = this._config.PageSize): Observable<carvingsourceResponse> {
        const parm = '?page=' + page + '&pageSize=' + pageSize;
        return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetAllCarvingSource) + parm)).pipe(
            map(data => data));
    }
    GetSummaryDocumentDates(): Observable<number[]> {
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetSummaryDocumentDates)).pipe(
            map(data => data));
    }

    BookmarkAction(item : summarydocuments)
    {
        var userbookmark = new userbookmarks();
        userbookmark.bookmarktypeid = this._config.bookmarkType.reference;
        userbookmark.saveditemid = item.id;
        if(!item.IsBookMark)
         this._config.UserBookmarkList.value.push(userbookmark);
        return this.userService.AddBookmark(userbookmark,!item.IsBookMark);
    }


}
