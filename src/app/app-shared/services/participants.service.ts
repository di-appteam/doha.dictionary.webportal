import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { SharedConfiguration } from './config.service';

@Injectable()
export class ParticipantsService {

    constructor(private _http: HttpService, private _config: SharedConfiguration, private _serviceUrlManager: ServiceUrlManager) {

    }


    GetGroups(): Observable<any> {
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetParticipantGroups)).pipe(
            map(data => data));
    }

    GetParticipantsByGroup(groupid:number): Observable<any> {
        const parm = '?id=' + groupid ;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetParticipantsByGroup) + parm).pipe(
            map(data => data));
    }


    private handleError(error:any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the //console
        //console.error(error);
        return observableThrowError(error || 'Server error');
    }

}
