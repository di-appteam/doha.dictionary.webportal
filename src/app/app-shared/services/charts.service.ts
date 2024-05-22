
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { lemmachartsmodel, ChartsCustomModelExc } from '../../app-models/charts.model';
import { ISummaryLexicalSheet } from '../../app-models/dictionary.model';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { SharedConfiguration } from './config.service';

@Injectable()
export class AppChartsService {

    constructor(private _http: HttpService, private _serviceUrlManager: ServiceUrlManager, private _config: SharedConfiguration) {

    }

    GetLemmasCountPerYears(): Observable<lemmachartsmodel[]> {
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmasCountPerYears)).pipe(
            map(data => data));
    }

    GetLemmasCountPerDuration(duration:any): Observable<lemmachartsmodel[]> {
      let url = this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmasCountPerDuration) + '?duration='+duration;
        return this._http.get(url).pipe(
            map(data => data));
    }

    GetLemmaCountPerYears(lemmaId: number = 0, rangeSize: number, word: string = ""): Observable<ChartsCustomModelExc[]> {
        const parm = '?lemmaId=' + lemmaId + '&rangeSize=' + rangeSize + '&word=' + word;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLemmaCountPerYears) + parm).pipe(
            map(data => data));
    }
    GetCountsOfUsageLemmaPerYear(lemmaId: number = 0, rangeSize: number, word: string = ""): Observable<ChartsCustomModelExc[]> {
        const parm = '?lemmaId=' + lemmaId + '&rangeSize=' + rangeSize + '&word=' + word;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetCountsOfUsageLemmaPerYear) + parm).pipe(
            map(data => data));
    }
    SearchByLemma(lemmaId:any): Observable<ISummaryLexicalSheet[]> {
        const parm = '?lemmaId=' + lemmaId;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetLexicalsheetDetailByLemma) + parm).pipe(
            map(data => data));
    }

    private handleError(error:any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the //console
        // console.error(error);
        return observableThrowError(error || 'Server error');
    }

}
