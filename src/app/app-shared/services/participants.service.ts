import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServicesIDs } from '../collection/serviceurl.enum';
import { HttpService } from '../security/requests/http.service';
import { ServiceUrlManager } from '../security/requests/serviceUrl.Manager';
import { SharedConfiguration } from './config.service';
import { SharedService } from './shared.service';

@Injectable()
export class ParticipantsService {

    constructor(private _http: HttpService, private _sharedService: SharedService, private _serviceUrlManager: ServiceUrlManager) {

    }


    GetGroups(): Observable<any> {
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetParticipantGroups)).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data)
            );
    }

    GetParticipantsByGroup(groupid:number): Observable<any> {
        const parm = '?id=' + groupid ;
        return this._http.get(this._serviceUrlManager.getServiceUrl(ServicesIDs.GetParticipantsByGroup) + parm).pipe(catchError((error: any) => { return this._sharedService.handleError(error) }),
            map(data => data)
            );
    }
}
