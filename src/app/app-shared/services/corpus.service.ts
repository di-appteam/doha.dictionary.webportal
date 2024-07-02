import { Injectable } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { corpussearchResponse, summarycorpusmodel, SearchSDModel } from "../../app-models/corpus.model";
import { userbookmarks } from "../../app-models/user-account.model";
import { ServicesIDs } from "../collection/serviceurl.enum";
import { HttpService } from "../security/requests/http.service";
import { ServiceUrlManager } from "../security/requests/serviceUrl.Manager";
import { AccountService } from "./account.service";
import { SharedConfiguration } from "./config.service";
import { SharedCorpusComponentValues } from "./corpus.general.service";
import { SharedService } from "./shared.service";


@Injectable()
export class CorpusService {

    constructor(private _http: HttpService, private _serviceUrlManager: ServiceUrlManager,private _sharedService: SharedService,
        private _sharedCorpusComponentValues: SharedCorpusComponentValues,private userService:AccountService,
    private _config:SharedConfiguration) {

    }


    public getcorpus(searchSD:any): Observable<corpussearchResponse> {
        return this._http.post((this._serviceUrlManager.getServiceUrl(ServicesIDs.SearchInCorpus)), searchSD).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }


    public getNextSequence(sequenceId:number): Observable<summarycorpusmodel> {
        return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetNextSequence)+'?sequenceId='+sequenceId)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }


    public getPrevSequence(sequenceId:number): Observable<summarycorpusmodel> {
        return this._http.get((this._serviceUrlManager.getServiceUrl(ServicesIDs.GetPrevSequence)+'?sequenceId='+sequenceId)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }

    BookmarkAction(item : summarycorpusmodel)
    {
        var userbookmark = new userbookmarks();
        userbookmark.bookmarktypeid = this._config.bookmarkType.sequence;
        userbookmark.saveditemid = item.ID;
        if(!item.IsBookMark)
         this._config.UserBookmarkList.value.push(userbookmark);
        return this.userService.AddBookmark(userbookmark,!item.IsBookMark);
    }

    onPrmChange(pageN: number = this._sharedCorpusComponentValues.pNumber, searchSDModel: SearchSDModel): Observable<corpussearchResponse> {
        if (pageN && this._sharedCorpusComponentValues.pNumber !== pageN) {
            this._sharedCorpusComponentValues.pNumber = pageN;
        }
        searchSDModel.page = this._sharedCorpusComponentValues.pNumber;
        return this.getcorpus(searchSDModel);
    }

    errorOnRequest() {
        this._sharedCorpusComponentValues.corpusSearchResult = [];
        this._sharedCorpusComponentValues.TotalCount = 0;
    }

}
