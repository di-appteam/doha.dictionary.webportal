
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { lemmachartsmodel, ChartsCustomModelExc } from '../../app-models/charts.model';
import { ISummaryLexicalSheet } from '../../app-models/dictionary.model';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { SharedConfiguration } from './config.service';
import { SharedService } from './shared.service';

@Injectable()
export class AppChartsService {

    constructor(private _http: HttpService, private _sharedService: SharedService,private _serviceUrlManager: ServiceUrlManager, private _config: SharedConfiguration) {

    }

    GetLemmasCountPerYears(): Observable<lemmachartsmodel[]> {
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmasCountPerYears)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data),
            );
    }

    GetLemmasCountPerDuration(duration:any): Observable<lemmachartsmodel[]> {
      let url = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmasCountPerDuration) + '?duration='+duration;
        return this._http.get(url).pipe( catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }

    GetLemmaCountPerYears(lemmaId: number = 0, rangeSize: number, word: string = ""): Observable<ChartsCustomModelExc[]> {
        const parm = '?lemmaId=' + lemmaId + '&rangeSize=' + rangeSize + '&word=' + word;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmaCountPerYears) + parm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }
    GetCountsOfUsageLemmaPerYear(lemmaId: number = 0, rangeSize: number, word: string = ""): Observable<ChartsCustomModelExc[]> {
        const parm = '?lemmaId=' + lemmaId + '&rangeSize=' + rangeSize + '&word=' + word;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetCountsOfUsageLemmaPerYear) + parm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }
    SearchByLemma(lemmaId:any): Observable<ISummaryLexicalSheet[]> {
        const parm = '?lemmaId=' + lemmaId;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexicalsheetDetailByLemma) + parm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data));
    }
}
